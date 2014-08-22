import app.User

class BootStrap {
    def testMongoService

    def init = { servletContext ->
      //  testMongoService.addSomeData()
        testMongoService.getSomeData()

        new User(email: 'jake.coffman+winningapp@gmail.com').save()
    }
    def destroy = {
    }
}
