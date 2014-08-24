class UrlMappings {

    static mappings = {

        "/$controller/$action?/$id?(.$format)?" {
            constraints {
                // apply constraints here
            }
        }

        "/ontologies/$name/$version"(controller: "ontologies", action: "getByVersion")
        "/ontologies/$name"(controller: "ontologies", action: "showIt")

        "/"(view: "/index")
        "500"(view: '/error')
    }
}
