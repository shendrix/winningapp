package app

import grails.rest.Resource

@Resource(formats=['json'])
class Ontology {
    String name
    String data
    Integer ontologyVersion = 1


    static mapping = {
        data type: 'text'
    }


    static constraints = {
    }



}
