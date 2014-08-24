package app

import grails.converters.JSON
import grails.rest.RestfulController
import grails.transaction.Transactional

class OntologiesController extends RestfulController {
    static responseFormats = ['json']

    OntologiesController() {
        super(Ontology)
    }


    def index (Integer max) {
        respond Ontology.list().unique { it.name}.sort { it.name}
    }

    @Transactional
    def save(Ontology o) {
        update(o)
    }

    @Transactional
    def update(Ontology o) {
        def oo = new Ontology(
                name: o.name,
                ontologyVersion: o.ontologyVersion + 1,
                data: o.data.toString())
                .save(flush: true, failOnError: true)

        render oo as JSON
    }

    def getByVersion() {

        def o = Ontology.findByNameAndOntologyVersion(params.name, params.version.toInteger())
        println o
        render o as JSON
    }

    def showIt() {
        def name = params.name
        def o = Ontology.findAllByName(name).sort { -it.ontologyVersion }[0]
        render o as JSON
    }

}
