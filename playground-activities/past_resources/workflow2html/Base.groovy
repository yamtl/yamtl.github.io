package flowchartToHtmlExamples
import static yamtl.dsl.Rule.*

import org.eclipse.emf.ecore.EPackage

import yamtl.core.YAMTLModule
import yamtl.groovy.YAMTLGroovyExtensions_dynamicEMF

class Base extends YAMTLModule {
    public Base(EPackage flowchartPk, EPackage htmlPk) {
        YAMTLGroovyExtensions_dynamicEMF.init(this)

        header().in("in", flowchartPk).out("out", htmlPk)

        ruleStore([

                rule('Flowchart2Heading')
                        .in("f", flowchartPk.Flowchart)
                        .out("h1", htmlPk.H1, {
                            h1.value = f.name
                        }),
                rule('Action2Heading')
                        .in("a", flowchartPk.Action)
                        .out("h1", htmlPk.H1, {
                            h1.value = a.name
                        }),
                rule('Decision2Heading')
                        .in("d", flowchartPk.Decision)
                        .out("h1", htmlPk.H1, {
                            h1.value = d.name
                        }),
                rule('Transition2Heading')
                        .in("t", flowchartPk.Transition)
                        .out("h1", htmlPk.H1, {
                            h1.value = t.name
                        })
        ])

    }
}