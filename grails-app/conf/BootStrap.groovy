class BootStrap {
    def testMongoService

    def init = { servletContext ->
      //  testMongoService.addSomeData()
        testMongoService.getSomeData()


    }
    def destroy = {
    }
}
