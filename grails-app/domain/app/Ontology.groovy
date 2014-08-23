package app

import grails.converters.JSON
import grails.rest.Resource

@Resource(uri='/ontologies', formats=['json'])
class Ontology {
    String name
    String data


    static mapping = {
        data type: 'text'
    }


    static constraints = {
    }



}
