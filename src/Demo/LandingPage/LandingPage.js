import React from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Service from './components/Service'
import CTA from './components/CTA'
import Pricing from './components/Pricing'
import Contact from './components/Contact'
import FAQ from './components/FAQ'
import Footer from './components/Footer'

class LandingPage extends React.Component {
    constructor(props){
        super(props)
        this.state = {  }
    }

    render(){
        return(
            <div>
                <Header />
                <Hero />
                <About />
                <Service />
                <CTA />
                <Pricing />
                <FAQ />
                <Footer />
            </div>
        )
    }
}

export default LandingPage