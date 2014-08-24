class UrlMappings {

    static mappings = {

        "/$controller/$action?/$id?(.$format)?" {
            constraints {
                // apply constraints here
            }
        }

        "/ontologies/$name/$version"(controller: "ontologies", action: "getByVersion")
        "/ontologies/$name(.$format)?"(controller: "ontologies") {
            action = [GET: 'showIt', POST: 'save', PUT: 'update']
        }

        "/"(view: "/index")
        "500"(view: '/error')
    }
}
