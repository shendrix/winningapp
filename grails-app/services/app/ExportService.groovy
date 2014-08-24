package app

import grails.transaction.Transactional
import org.semanticweb.owlapi.apibinding.OWLManager
import org.semanticweb.owlapi.io.OWLXMLOntologyFormat
import org.semanticweb.owlapi.model.IRI
import org.semanticweb.owlapi.model.OWLOntology
import org.semanticweb.owlapi.model.OWLOntologyFormat
import org.semanticweb.owlapi.model.OWLOntologyManager

@Transactional
class ExportService {

    def exportOWL(String path) {
        def file = new File(path)

        OWLOntologyManager manager = OWLManager.createOWLOntologyManager();
        OWLOntology o = manager.createOntology()

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



        manager.saveOntology(o, owlxmlFormat,
                IRI.create(file.toURI()));

    }
}
