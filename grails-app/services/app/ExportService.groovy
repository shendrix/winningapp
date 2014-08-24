package app

import grails.transaction.Transactional
import groovy.json.JsonSlurper
import org.semanticweb.owlapi.apibinding.OWLManager
import org.semanticweb.owlapi.io.OWLXMLOntologyFormat
import org.semanticweb.owlapi.model.AddAxiom
import org.semanticweb.owlapi.model.IRI
import org.semanticweb.owlapi.model.OWLAxiom
import org.semanticweb.owlapi.model.OWLClass
import org.semanticweb.owlapi.model.OWLOntology
import org.semanticweb.owlapi.model.OWLOntologyFormat
import org.semanticweb.owlapi.model.OWLOntologyManager

@Transactional
class ExportService {

    def exportOWL(Ontology ont) {

        OWLOntologyManager manager = OWLManager.createOWLOntologyManager();
        OWLOntology o = manager.createOntology()

        def data = new JsonSlurper().parseText(ont.data)

        def ba = new ByteArrayOutputStream()
        data.each {
            OWLClass clz = manager.getOWLDataFactory().getOWLClass(IRI.create("http://winningapp#${it.label}"));
            OWLAxiom a = manager.getOWLDataFactory().getOWLSubClassOfAxiom(clz, manager.getOWLDataFactory().getOWLThing())
            manager.addAxiom(o, a)
        }

        //   OWLClass clz = manager.getOWLDataFactory().getOWLClass(IRI.create("http://tutorial#A"));
        //  clz.

        OWLOntologyFormat format = manager.getOntologyFormat(o);
        // We can save the ontology in a different format Lets save the ontology
        // in owl/xml format
        OWLXMLOntologyFormat owlxmlFormat = new OWLXMLOntologyFormat();
        // Some ontology formats support prefix names and prefix IRIs. In our
        // case we loaded the pizza ontology from an rdf/xml format, which
        // supports prefixes. When we save the ontology in the new format we
        // will copy the prefixes over so that we have nicely abbreviated IRIs
        // in the new ontology document
        if (format.isPrefixOWLOntologyFormat()) {
            owlxmlFormat.copyPrefixesFrom(format.asPrefixOWLOntologyFormat());
        }
        manager.saveOntology(o, owlxmlFormat, ba)

        return new String(ba.toByteArray())


    }
}
