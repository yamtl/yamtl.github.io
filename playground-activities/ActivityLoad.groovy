import java.nio.file.Files
import java.nio.file.Paths
import java.util.Map
import org.junit.jupiter.api.Assertions
import prettyprinting.plantuml.EMFPlantUMLSerializer
import java.io.IOException

import org.eclipse.emf.ecore.EcorePackage
import org.eclipse.emf.ecore.EClass
import org.eclipse.emf.ecore.EDataType
import org.eclipse.emf.ecore.EOperation
import org.eclipse.emf.ecore.EPackage
import static org.junit.Assert.assertTrue

import yamtl.core.YAMTLModule
import untypedModel.ERecord
import untypedModel.UntypedModelPackage
import untypedModel.impl.ERecordImpl

import static yamtl.dsl.Rule.*
import static yamtl.dsl.Helper.*

import prettyprinting.EMFPrettyPrinter

import yamtl.groovy.YAMTLGroovyExtensions
import yamtl.groovy.YAMTLGroovyExtensions_dynamicEMF

class ActivityLoad extends YAMTLModule {
	
	ActivityLoad(EPackage activityPk) {
		YAMTLGroovyExtensions_dynamicEMF.init(this)
		header().in('yaml').out('activity', activityPk)
		ruleStore([
			
			rule('Root')
			.in('r').filter { r.activities != null }
			.out('conf', activityPk.ActivityConfiguration, {
				conf.activities.addAll( fetch( r.activities ) )
			}),
			
			rule('Activity')
				.in('r').filter { r.tools && r.panels }
				.out('act', activityPk.Activity, {
					act.id = r.id
					act.title = r.title
					act.icon = r.icon
					act.tools = r.tools
					
					act.panels.addAll( fetch( r.panels ) )
					
					def layout = r.layout.get(0)
					int i = 0
					layout.area.each { 
						act.layout.add( fetch( layout, i++ )  )
					}
					
					if (r.actions)
						act.actions.addAll( fetch( r.actions ))
				}),
			
			rule('Panel')
				.in('r').filter { r.name && r.ref}
				.out('p', activityPk.Panel, {
					p.id = r.id
					p.name = r.name
					p.refId = r.ref
					if (r.buttons)
						p.buttons.addAll( fetch( r.buttons ) )
				}),
				
			rule('CompositePanel').inheritsFrom(['Panel'])
				.in('r').filter {  r.name && r.ref && r.childPanels != null }
				.out('p', activityPk.CompositePanel, {
					p.childPanels.addAll( fetch(r.childPanels) )
				}),
				
			rule('LayoutRow').toMany()
				.in('r').filter{ r.area != null }
				.toManyCap{r.area.size()}
				.out('row', activityPk.LayoutRow, {
					
					r.area[matchCount].each { 
						def panelRef = findPanelById(['id': it])
						row.columns += fetch(panelRef) 
					}
				}),
			
			rule('Button')
			  	.in('r').filter{ r.targetPanel instanceof String && r.targetPanel}
				.out('b', activityPk.ButtonRef, {
					b.id = r.id
					b.icon = r.icon
					b.hint = r.hint
					b.internalFunction = r.internal
					b.targetPanel = fetch(findPanelById(['id': r.targetPanel]))
				}),
			
			rule('Action')			  	
				.in('r').filter{ r.source && r.sourceButton}
				.out('b', activityPk.Action, {
					b.sourcePanel = fetch(findPanelById(['id': r.source]))
					b.output = fetch(findPanelById(['id': r.output]))
					b.outputType = r.outputType
					if (r.outputConsole)
						b.outputConsole = fetch(findPanelById(['id': r.outputConsole]))
					b.sourceButton = fetch(findButtonById(['id': r.sourceButton])) // FIX: this should only be an IDs
					
					// Each attribute needs to be translated to a param 
					r.parameters.each{param ->
						b.arguments.addAll( fetch(param.attributes, 'arg', 'Argument') )
					}
				}),
			
			rule('Argument').isUniqueLazy()
			  	.in('att', FlexibleMM.attributeValue)
				.out('arg', activityPk.Argument, {
					arg.key = att.key
					arg.value = att.value
				})
		])
		
		helperStore([
			staticOperation('findPanelById', { argsMap ->
				def refId = argsMap['id']
				return allInstances(FlexibleMM.ERecord)
					.findAll{ it.name && it.ref }
					.find{ it.id == refId }	
			}),
			staticOperation('findButtonById', { argsMap ->
				def refId = argsMap['id']
				return allInstances(FlexibleMM.ERecord)
					.findAll{ r.targetPanel instanceof String && r.targetPanel }
					.find{ it.id == refId }
			})
		])
	}
	
	public static FlexibleMM = UntypedModelPackage.eINSTANCE ;

	static void main(String[] args) {
		def inputModel = './model-test/education_platform/cd2db_activity.yml'
		
		
		def activityPk = ActivityLoad.preloadMetamodel('./model-test/education_platform/activity_lang.ecore').getContents().get(0) as EPackage

		def xform = new ActivityLoad(activityPk)
		YAMTLGroovyExtensions.init(xform)
		xform.loadInputModels(['yaml': inputModel])
		xform.execute()
		
		xform.saveOutputModels(['activity': './model-test/education_platform/output.xmi'])
		def outputRes = xform.getModelResource('activity')
	
	}
	

}
