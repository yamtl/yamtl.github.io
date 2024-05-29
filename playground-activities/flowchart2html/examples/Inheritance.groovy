package flowchartToHtmlExamples
import static yamtl.dsl.Rule.*

import org.eclipse.emf.ecore.EPackage

import yamtl.core.YAMTLModule
import yamtl.groovy.YAMTLGroovyExtensions_dynamicEMF

class Inheritance extends YAMTLModule {
    public Inheritance(EPackage flowchartPk, EPackage htmlPk) {
        YAMTLGroovyExtensions_dynamicEMF.init(this)

        header().in("in", flowchartPk).out("out", htmlPk)

        ruleStore([
                //This parent rule is abstract, so it will not be applied directly
                //but it can be executed by its children
                rule('Flowchart2H1')
                        .isAbstract()
                        .in("e", flowchartPk.Flowchart)
                        .out("h1", htmlPk.H1, {
                            h1.value = "Flowchart " + e.name
                        }),

                //This child rule inherits from the previous one
                rule('Subflow2H1')
                        .inheritsFrom(['Flowchart2H1'])
                        .in("e", flowchartPk.Subflow)
                        .out("h1", htmlPk.H1, {
                            //r.h.s h1.value is inherited from the parent rule
                            //'e' object is passed to the parent rule to calculate h1.value
                            h1.value = "Subflow " + h1.value 
                        })
        ])
    }
}