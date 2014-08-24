package app

import grails.converters.JSON
import grails.rest.RestfulController
import grails.transaction.Transactional

class OntologiesController extends RestfulController {
    static responseFormats = ['json']

    OntologiesController() {
        super(Ontology)
    }


    @Transactional
    def save(Ontology o) {
        update(o)
    }

    @Transactional
    def update(Ontology o) {
        def oo = new Ontology(name: o.name, ontologyVersion: o.ontologyVersion + 1, data: o.data.toString()).save(flush: true, failOnError: true)

        render oo as JSON
    }

}
