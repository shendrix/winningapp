package app

import grails.rest.Resource

@Resource(formats = ['json'])
class User {
    String email

    static constraints = {
    }
}
