package app

class Document {
    String attr1

    List<SubDocument> docs = []
    static embedded = ['docs']


    static mapWith = "mongo"

    static constraints = {
    }
}
