import static yamtl.dsl.Rule.*
import static yamtl.dsl.Helper.*

import org.eclipse.emf.ecore.EPackage

import yamtl.core.YAMTLModule
import yamtl.groovy.YAMTLGroovyExtensions_dynamicEMF

class CD2DB extends YAMTLModule {
	public CD2DB(EPackage CD, EPackage DB) {
		header()
			.in('cd', CD)
			.out('db', DB)
			
		ruleStore( [
			
			rule('ClassToTable')
				.in('c', CD.getEClassifier("Class"))
				.out('t', DB.getEClassifier("Table"), {
					t.name = c.name
					t.col.add(pk_col)
					t.key.addAll( fetch(c.attr.findAll{a -> !a.multiValued }) )
				})
				.out('pk_col', DB.getEClassifier("Column"), {
					pk_col.name = 'objectId'
					pk_col.type = fetch(objectIdType)
				})
		
		])
		
		helperStore( [
			
			staticAttribute('objectIdType', {
				allInstances(CD.getEClassifier("DataType")).find{ CD.getEClassifier("DataType").isInstance(it) && it.name == "Integer" }				
			})
			
		])
	}
}
