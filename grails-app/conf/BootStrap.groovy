import app.Ontology
import grails.converters.JSON

class BootStrap {
    def testMongoService
    def ontologyLoaderService

    def init = { servletContext ->
//      //  testMongoService.addSomeData()
//        testMongoService.getSomeData()
//
//        new User(email: 'jake.coffman+winningapp@gmail.com').save()

        ontologyLoaderService.loadNewOntologies()



    }
    def destroy = {
    }
}
