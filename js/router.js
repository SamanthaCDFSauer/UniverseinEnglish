export class Router {
    routes = {}

    add(routeName, page) {
        this.routes[routeName] = page
    }

    route(event) {
        event = event || window.event
        event.preventDefault()
        
        window.history.pushState({}, "", event.target.href)
        
        this.handle()
    }

    changeBackground(background) {
        var minhaDiv = document.getElementById('background');
        minhaDiv.style.backgroundImage = 'url('+background+')';
    }

    handle() {
        const { pathname } = window.location
        const route = this.routes[pathname] || this.routes[404]

        if (pathname === '/theuniverse') {
            this.changeBackground("./assets/mountains-universe02.png")
        }

        if (pathname === '/exploration') {
            this.changeBackground("./assets/mountains-universe-3.png")
        }

        if (pathname === '/') {
            this.changeBackground("./assets/mountains-universe-1.png")
        }

        if (route === '/pages/404.html') {
            this.changeBackground("./assets/mountains-universe-1.png")
        }
 
        fetch(route)
        .then(data => data.text())
        .then(html => {
            document.querySelector('#app').innerHTML = html
        })
    }
}