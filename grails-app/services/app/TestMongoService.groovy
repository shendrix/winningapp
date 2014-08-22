package app

import com.gmongo.GMongo
import com.mongodb.Mongo
import grails.transaction.Transactional

@Transactional

class TestMongoService {
    GMongo mongo

    def addSomeData() {
        // see http://grails.github.io/grails-data-mapping/mongodb/manual/index.html
        // Add some data using GORM
        Document d = new Document()
        d.attr1 = "TEST2"
        SubDocument sub = new SubDocument()

        sub.name = "STEVE"
        sub.email = "steve@steve.com"
        SubDocument sub2 = new SubDocument()

        sub2.name = "BOB"
        sub2.email = "bob@bob.com"

        d.docs << sub
        d.docs << sub2

        d.save()

    }

    def getSomeData() {
        // http://grails.github.io/grails-data-mapping/mongodb/manual/guide/4.%20Low-level%20API.html

        def db = mongo.getDB("db")
        def objs = db.document.find()

        println "Document count: ${objs.size()}"

        objs.each {
            println it
        }
    }
}
