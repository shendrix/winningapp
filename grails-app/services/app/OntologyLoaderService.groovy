package app

import grails.converters.JSON
import grails.transaction.Transactional

@Transactional
class OntologyLoaderService {
    def grailsApplication

    def loadNewOntologies() {
        def dir = grailsApplication.config.app.sourceDataDir
        println("Data Dir ${dir}")

        def list = []

        new File(dir).listFiles().each {
            def name = it.name[0..-5]
            Ontology o = Ontology.findByName(name)

            if (o) {
                println "Ontology ${name} already exists"
            } else {
                it.eachLine {
                    def words = it.split("\t")
                    def top = words[0]
                    words = words[1..-1]
                    def first = new Clazz(label: top)
                    words.each { word ->

                        if (!first.children) {
                            first.children = []
                        }
                        first.children << new Clazz(label: word)
                    }

                    list << first
                }
                println "Size: ${list.size()}"
                o = new Ontology(name: name)
                o.data = list as JSON
                o.save(flush: true, failOnError: true)
            }


        }
    }
}