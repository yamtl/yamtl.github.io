# YAMTL Language Reference

In YAMTL, `YAMTLModule` is a foundational class that provides the core functionality and infrastructure for defining and executing model transformations. It serves as the base class for any transformation module, offering access to the YAMTL DSL and methods necessary for configuring and running transformations.

The key roles of `YAMTLModule` are:

1. **Configuration**: `YAMTLModule` is used to set up the transformation environment, including input and output models, namespaces, and execution modes.

2. **Transformation Definition**: It allows users to define transformation rules, helpers, and various other elements necessary for transforming models.

3. **Execution Control**: It provides methods to execute the transformation, propagate changes, and manage incremental transformations.

4. **Utility Methods**: It includes utility commands like `fetch()` and `allInstances()` to facilitate querying and manipulating model elements during transformation.

The following section describes how to use it.

## Basic Syntax

A YAMTL model transformation is defined as a class that specializes the `YAMTLModule` class, which provides access to the YAMTL DSL and to methods to configure and execute model transformations:

=== "Groovy"

    ```yamtl-groovy
    class <name> extends YAMTLModule {
        public <name> (EPackage <pk1>, EPackage <pk2>) {
            YAMTLGroovyExtensions_dynamicEMF.init(this)
            header().in(<in_domain_name1>,<pk1>).out(<in_domain_name2>,<pk2>)
            ruleStore([ /* rules here */ ])
            helperStore([  /* managed helpers here */ ])
        }
    }
    ```

=== "Xtend"

    ```yamtl-xtend
    class <name> extends YAMTLModule {
        new(EPackage <pk1>, EPackage <pk2>) {
            header().in(<in_domain_name1>,<pk1>).out(<in_domain_name2>,<pk2>)
            ruleStore(#[ /* rules here */ ])
            helperStore(#[ /* managed helpers here */ ])
        }
    }
    ```

=== "Java"

    ```yamtl-java
    public class <name> extends YAMTLModule {
        public <name>(EPackage <pk1>, EPackage <pk2>) {
            header().in(<in_domain_name1>,<pk1>).out(<in_domain_name2>,<pk2>);
            ruleStore(List.of( /* rules here */ ));
            helperStore(List.of( /* managed helpers here */ ));
        }
    }
    ```

=== "Kotlin"

    ```yamtl-kotlin
    class <name>(<pk1>: EPackage, <pk2>: EPackage) : YAMTLModule() {
        init {
            header().`in`(<in_domain_name1>,<pk1>).out(<in_domain_name2>,<pk2>)
            ruleStore(listOf( /* rules here */ ))
            helperStore(listOf( /* managed helpers here */ ))
        }
    }
    ```



In the code above there are four important sections:

* **Constructor** signature: It should include the different metamodels (`EPackage` instances) used in the transformation. 
*   **Header**: This section declares the signature of the model transformation using a unique name for each domain and its corresponding metamodel, which can be shared across domains.  
*   **Rule Store**: This section declares a list of transformation rules.
*   **Helper Store (Optional)**: Accepts a list of managed helpers. Managed helpers are attributes or methods that are optimized in YAMTL using an internal cache for their results. Unmanaged helpers are declared as standard methods of the module class. This section is optional if no managed helpers are needed.

!!! tip "Static Typing for Accessors/Mutators"
    If you [generate code from Ecore models](https://www.vogella.com/tutorials/EclipseEMF/article.html) within the Eclipse Modeling Framework, there is no need to declare `EPackage` parameters for the headers. These are accessible from the `eINSTANCE` associated with each `<X>Package` class, where `<X>` is the name of your `EPackage` in the Ecore model.
    Once the models are stable, generated code will provide several advantages:
    1. Static typing and code completion in IDEs.
    2. Optimized performance at runtime: accessors/mutators will not need to use generic EMF reflection.
    3. Groovy is the only language configured to work with dynamic EMF models (i.e., models whose metamodel is given as an Ecore model but not implemented in Java). Other languages (Java, Kotlin, Xtend, etc.) will benefit from generated code to avoid using lengthy expressions with the EMF API.    

    However, if you are still experimenting with your Ecore models, we recommend working with dynamic EMF models and the YAMTL Groovy DSL for faster prototyping.

The basic format of a YAMTL rule definition is as follows:

``` yamtl-groovy
rule("<name>")
    .in("<in_object_name>", <in_object_type>)
        [.derivedWith(<QUERY>)]?
        [.filter(<FILTER>)]?
    .out("<out_object_name>", <out_object_type>, <ACTION>)
```
!!! info "Legend"

    `<>` indicates user-definable expressions. Note that these are placeholders and not part of the actual YAMTL syntax. Lowercase snake case (e.g., `in_object_name`) usually denotes variable names and types, including lists of variable names. Uppercase snake case (e.g., `<FILTER>` or `<ACTION>`) represents lambda expressions, and they are written using the syntax of the host language. `[]?` means optional.

A rule is declared using `rule("<name>")` with a rule name. The static operation `rule` can be used with `import static yamtl.dsl.Rule.*`. Each rule consists of one or more input element(s), defined using `in("<in_object_name>", <in_object_type>)` operation that requires a source element name and type; an optional `.derivedWith(<QUERY>)` clause where `<QUERY>` is a lambda expression of type `Supplier<EObject>` that produces the object that will be matched to the input element; an optional filter condition expressed with `filter(<FILTER>)` where `<FILTER>` is a lambda expression of type `Supplier<Boolean>`; and one or more output element(s), declared with `out("out_object_name", <out_object_type>, <ACTION>)` requiring a target element name and type, along with a side-effecting lambda expression `<ACTION>` of type `Runnable` containing action statements that initialize or update the output object attributes and references. <br>


## YAMTL Semantics

Model transformations can be used to define model queries by using pattern matching, out-place model transformation by *mapping* an input model into a *new* output model, or in-place model transformations by *rewriting* a given model.

### Pattern Matching Semantics

Pattern matching is the process by which YAMTL tries to find object graphs in the input model where the input pattern of a rule can be matched. 

There are two main types of input elements: **matched** elements, which are mapped by YAMTL to objects in the input model, and **derived** elements, which are defined with a `.derivedWith(<QUERY>)` clause and need to be derived from input elements that have been matched in preceding input elements. 

To find a match for a rule, YAMTL first maps each matched input element of the rule to objects in the input model in the order in which they appear. For derived elements, YAMTL tries to complete the total match by processing query expressions in the order that they were declared. If a query cannot be resolved to an object, that rule's match is invalid. 

A match for a matched rule must be **unique**. That is, no other rule should be applicable to the same match. Uniqueness of matches is checked at runtime using the flag `YAMTLModule::setEnableCorrectnessCheck(Boolean)`, which is `true` by default. Non-unique matches are allowed when using [lazy rules](#lazy-rules), which are called on demand, and when using [ToMany rules](#tomany-rules), which create a fixed number of rule application for the same match.

A match is **complete** when all input elements are mapped to objects, either implicitly via matched input elements or explicitly via derived input elements. A match is defined as a map where the key is the input variable name and the value is the corresponding matched `EObject`.

!!! tip "Model-sensitive pattern matching"

    The input elements are ordered by the size of their type extent (smaller-sized types are matched before bigger ones) when enabling the flag `YAMTLModule::setEnabledMatchingInputElementOrderBySize(true)`. This can lead to significant run-time improvements when the distribution of objects across types is imbalanced.
    
    This optimization can, however, cause problems when the order of the input elements alters the order in which input element declaration is expected in filter expressions. For example, assuming that `Type1` declares a boolean method `isEnabled()` and that `Type2` has fewer objects than `Type1`, the order of input elements in the following input pattern

    ```
    .in("a", Type1)
    .in("b", Type2).filter{ a.isEnabled() }
    ```

    will be changed by the flag `setEnabledMatchingInputElementOrderBySize`. This will cause a problem because the input element `b` will be evaluated first and its filter condition needs "a" to be matched first. In such cases, the flag `YAMTLModule::setEnabledMatchingInputElementOrderBySize` must be kept disabled.


A match for a rule is **valid** when it is unique, complete and all of the filters of the input pattern are satisfied. Filters come in two flavours:

* **Local filters**: defined for an input element `.in("<in_object_name>", <in_object_type>).filter(<FILTER>)`. The lambda expression `<FILTER>` can use any object variable declared in a preceding input element.
* **Global filters**: defined for the last input element of the input pattern. All input object variables can be used for defining the filter expression. A single global filter can be defined for a rule using the clause `.globalFilter(<FILTER>)` at the end of the input pattern. 

!!! tip "Design principles for efficient pattern matching"

    1. Matched input elements should only be defined for matching objects that are not related to each other through references. If they are then they should be defined as derived elements instead.

    2. Local element filter conditions should be opted for instead of global rule filter conditions to help the matching algorithm remove invalid matches as soon as possible (reduces execution time).

    3. Once it is known that only unique matches are found within a model for a given set of rules, the model transformation containing them can be executed more efficiently by disabling the uniqueness correctness check with `YAMTLModule::setEnableCorrectnessCheck(false)`.

YAMTL's pattern matcher can be used to implement model queries. A model query is a rule that only has an input pattern and that may have a final action block `endWith(<ACTION>)`:

``` yamtl-groovy
rule("<name>")
    .in("<in_object_name>", <in_object_type>)[.derivedWith(<QUERY>)]?[.filter(<FILTER>)]?
    .query()
    [.endWith(<ACTION>)]?
```

The `<ACTION>` in `endWith(<ACTION>)` is a lambda expression of type `Runnable` that may use the input element variables to perform some action on the input objects that have been matched, e.g., reporting error messages or computing metrics.

To configure and execute a YAMTL module for implementing rule-based queries, use the following template:


=== "Groovy"

    ```groovy
    def resource = BaseQuery.preloadMetamodel("<path_to_metamodel>")
    def query = new BaseQuery(resource.contents[0])
    YAMTLGroovyExtensions.init(query)
    query.selectedExecutionPhases = ExecutionPhase.MATCH_ONLY
    query.loadInputModels(["<in_domain_name>": "<path_to_model>"])
    query.execute()
    ```

=== "Xtend"

    ```xtend
    val resource = BaseQuery.preloadMetamodel("<path_to_metamodel>") as Resource
    val query = new BaseQuery(resource.contents[0] as EPackage)
    query.selectedExecutionPhases = ExecutionPhase.MATCH_ONLY
    query.loadInputModels(#[ "<in_domain_name>" -> "<path_to_model>" ])
    query.execute()
    ```

=== "Java"

    ```java
    Resource resource = (Resource) BaseQuery.preloadMetamodel("<path_to_metamodel>");
    BaseQuery query = new BaseQuery((EPackage) resource.getContents().get(0));
    query.setSelectedExecutionPhases(ExecutionPhase.MATCH_ONLY);
    query.loadInputModels(Collections.singletonMap("<in_domain_name>", "<path_to_model>"));
    query.execute();
    ```

=== "Kotlin"

    ```kotlin
    val resource = BaseQuery.preloadMetamodel("<path_to_metamodel>")
    val query = BaseQuery(resource.contents[0])
    query.selectedExecutionPhases = ExecutionPhase.MATCH_ONLY
    query.loadInputModels(mapOf("<in_domain_name>" to "<path_to_model>"))
    query.execute()
    ```


When using dynamic EMF for accessing metamodel metadata (i.e., EMF code has not been generated for the metamodel), use the static method `YAMTLModule::loadMetamodel("<path_to_metamodel>")`, which works with both Ecore files (`.ecore`) and with [EMFatic](https://eclipse.dev/emfatic/) files (`.emf`) to load the metamodel. Then instantiate the YAMTL module containing the model query, configure it to execute only the matching phase, load the input models and, finally, execute the query using the method `YAMTLModule::execute()`. 

The `<path_to_metamodel>` can also be a URL (`http:` or `https:`) to the model in an accessible remote repository.

The results of the queries can be handled in blocks `endWith(<ACTION)` of query rules, for example printing them in the output console or accumulating them in local variables.


### Out-place Transformation Semantics

YAMTL modules are typically used to specify model-to-model transformations, where the objects of an input model are mapped to objects of an output model that is created **from scratch**. This is commonly referred to as out-place transformation because the input model is read-only and not modified.

This semantics is characterized by the following properties:

* **Immutability of Source Models**: The input model remains immutable during the transformation process. Consequently, a new output model is generated to encapsulate the transformation result, thereby preserving the integrity of the original input model. This immutability eliminates the risk of unintended side effects that could potentially alter the source model in undesirable ways.
* **Separation of Concerns**: Out-of-place transformations naturally enable a clear separation of concerns between the input and output models. This is beneficial for modularisation and reusability of transformation rules, as each rule can be designed to perform a specific, self-contained task without affecting the input model.
* **Traceability and Versioning**: The creation of a separate output model in out-of-place transformations provides better support for traceability and versioning. Each transformation produces a new model that can be stored, compared, and traced back to its originating source model. This facilitates debugging, testing, and long-term maintenance. This feature also enables the **incremental execution** of model transformations based on change propagation from the input model to the output model.

Side effects in a model transformation are specified in the `out` elements of rules. For each transformation rule that has been matched, the rule is applied by creating an object in the output model for each `out` element and the object is initialized using the corresponding `<ACTION>` expression. Within a rule, an `ACTION` expression can refer to:

* the input object variables (either matched or derived) of that rule, 
* `using` variables of that rule, and 
* all output object variables of that rule.


To configure and execute a YAMTL module for implementing an out-place transformation, use the following template:

=== "Groovy"

    ```groovy
    def resource = YAMTLModule.preloadMetamodel("<path_to_metamodel>")
    def xform = new XForm(resource.contents[0])
    YAMTLGroovyExtensions.init(xform)
    xform.loadInputModels(["<in_domain_name>": "<path_to_model>"])
    xform.execute()
    xform.saveOutputModels(["<out_domain_name": "<path_to_model>"])
    ```

=== "Xtend"

    ```xtend
    val resource = YAMTLModule.preloadMetamodel("<path_to_metamodel>") as Resource
    val xform = new XForm(resource.contents[0] as EPackage)
    xform.loadInputModels(#[ "<in_domain_name>" -> "<path_to_model>" ])
    xform.execute()
    xform.saveOutputModels(#[ "<out_domain_name>" -> "<path_to_model>" ])
    ```

=== "Java"

    ```java
    Resource resource = (Resource) YAMTLModule.preloadMetamodel("<path_to_metamodel>");
    XForm xform = new XForm((EPackage)resource.getContents().get(0));
    xform.loadInputModels(Collections.singletonMap("<in_domain_name>", "<path_to_model>"));
    xform.execute();
    xform.saveOutputModels(Collections.singletonMap("<out_domain_name>", "<path_to_model>"));
    ```

=== "Kotlin"

    ```kotlin
    val resource = YAMTLModule.preloadMetamodel("<path_to_metamodel>")
    val xform = XForm(resource.contents[0])
    xform.loadInputModels(mapOf("<in_domain_name>" to "<path_to_model>"))
    xform.execute()
    xform.saveOutputModels(mapOf("<out_domain_name>" to "<path_to_model>"))
    ```

When an expression needs to reference output objects that are initialized by other rules, the operation `YAMTLModule::fetch()` needs to be used. The primary purpose of the `fetch` operation is to retrieve output objects corresponding to a given input object through the application of a transformation rule. The simplest version is suitable for matched rules that have a single object pattern in both the input and output patterns: `fetch(input_matched_object)` will return the output object created by the rule that matched `input_matched_object`.

!!! Tip "Using Actions Effectively"
    
    In a rule with an output element `.out(<out_object_name>, <out_object_type>, <ACTION>)`, the expression ``<ACTION>`` should only be used to initialize the output object of type `<out_object_type>` that is created by this output element.


!!! Tip "Creation of Objects"
    
    YAMTL augments mainstream JVM programming languages with declarative model transformation capabilities, yet imperative features of the host languages can still be used.
    Declarative object creation is normally handled in `out` elements in the output pattern of a rule, when an output element is defined with a new name it creates a new instance of the initialized object. 

    Using imperative features, ad-hoc objects that are manually created using an object factory and assigned to an output element in the ``ACTION`` expression, are not traced by YAMTL. This means such non-traced objects cannot be fetched from another rule using the operation `fetch()`.


### In-place Semantics

!!! Warning "This semantics is experimental."

An in-place transformation in YAMTL is a model transformation where the model is modified directly to produce the desired output model, without creating a new or separate model as the output. In other words, the transformation process occurs within the same model instance, and the original model is incrementally updated to match the structure and content specified by the transformation rules.

This approach has several implications and characteristics:

* **Mutability of Source Models**: In in-place transformations, the input model is mutable, meaning that its elements can be modified during the transformation process. This is in contrast to out-of-place transformations, where a new model is created as the output, leaving the input model unchanged.
* **Efficiency**: In-place transformations can be more efficient in terms of memory usage and execution time compared to out-of-place transformations, especially when dealing with large models. This efficiency is due to the avoidance of duplicating the entire input model structure in the output model. 
* **Potential Side Effects**: Since the input model is modified directly, it is essential to carefully manage and control potential side effects. Changes made during the transformation might affect the application of transformation rules or introduce inconsistencies if not handled correctly.

When declaring an in-place transformation, the header of the module containing the in-place transformation rules must identify the parameter that refers to the model to be modified in-place using the keyword `inOut`: `header().inOut(<inOut_domain_name>,<pk>)`.

YAMTL in-place transformations can be both additive and subtractive:

* To create new objects, use `out` elements in rule output patterns that **do not** correspond to an `in` domain, or any of its parent rules.
* To update existing objects, use `out` elements in rule output patterns that **do** correspond to an `in` domain of the same rule, or any of its parent rules.
* To delete objects that exist in the model, use `.drop()` on the corresponding `out` element that refers to an `in` element. The `in` element must be matched by the rule in order for it to be deleted. When using `.drop()` the following flag must be disabled for the module `xform.enableUpdateExtent(false)`, where `xform` refers to the YAMTLModule instance that declares the model transformation rules. `drop()` has delete cascade semantics that indicates both the object and its contents following containment references are removed. When an object is deleted from the model, all the objects contained through containment references in it will also be removed.
* YAMTL also offers a less dramatic option to avoid deleting objects from the model by **freezing** parts of the model. An object in the model is said to be frozen when YAMTL's pattern matcher is oblivious to it. 
Objects can be frozen/unfrozen using the operations `.freeze()`/`.unfreeze()` on `inOut` elements, i.e. to those `out` elements whose name and type coincides with an `in` element. When using  `.freeze()`/`.unfreeze()` the following flag must be disabled for the module `xform.enableUpdateExtent(false)`, where `xform` refers to the YAMTLModule instance that declares the model transformation rules. 

Since rules are applied over a model in-place, the side-effect of a rule application may enable additional rules and the pattern matching process needs to be performed iteratively. YAMTL provides two strategies to evaluate rules:

* **Single-Match Mode**: As soon as the pattern matcher finds a match, the associated rule is executed. This mode is enabled with the flag `xform.setWithStagedExecution(false)`, where `xform` is the `YAMTLModule` instance containing the declaration of transformation rules. In case of non-terminating transformations, the number of transformation steps can be limited by setting a cap using `YAMTLModule::setTransitionUpperBound(Long)`, which by default is set to `Long.MAX_VALUE`.
* **Staged Mode**: Rules are evaluated in stages, where each stage involves identifying all applicable matches prior to rule execution. This evaluation mode is similar to the evaluation strategy used in out-place transformations. The difference is that the transformation may consist of different stages. This mode is enabled with the flag `xform.setWithStagedExecution(true)`, where `xform` is the `YAMTLModule` instance containing the declaration of transformation rules. The number of stages that are perfomed can also be capped using `YAMTLModule::setStageUpperBound(Long)`, which by default is set to `1`.

To configure and execute a YAMTL module for implementing an in-place transformation, use the following template:

=== "Groovy"

    ```groovy
    def resource = YAMTLModule.preloadMetamodel("<path_to_metamodel>")
    def xform = new XForm(resource.contents[0])
    YAMTLGroovyExtensions.init(xform)
    xform.setInplace(true) // enables the in-place transformation semantics
    xform.setWithStagedExecution(false) // YAMTL to use one match at a time
    xform.enableUpdateExtent(false) // to be used with drop() and freeze()/unfreeze()

    xform.loadInputModels(["<in_domain_name>": "<path_to_model>"])
    xform.execute()
    xform.saveOutputModels(["<out_domain_name": "<path_to_model>"])
    ```

=== "Xtend"

    ```xtend
    val resource = YAMTLModule.preloadMetamodel("<path_to_metamodel>") as Resource
    val xform = new XForm(resource.contents[0] as EPackage)
    xform.setInplace(true) // enables the in-place transformation semantics
    xform.setWithStagedExecution(false) // YAMTL to use one match at a time
    xform.enableUpdateExtent(false) // to be used with drop() and freeze()/unfreeze()

    xform.loadInputModels(#[ "<in_domain_name>" -> "<path_to_model>" ])
    xform.execute()
    xform.saveOutputModels(#[ "<out_domain_name>" -> "<path_to_model>" ])
    ```

=== "Java"

    ```java
    Resource resource = (Resource) YAMTLModule.preloadMetamodel("<path_to_metamodel>");
    XForm xform = new XForm((EPackage)resource.getContents().get(0));
    xform.setInplace(true); // enables the in-place transformation semantics
    xform.setWithStagedExecution(false); // YAMTL to use one match at a time
    xform.enableUpdateExtent(false); // to be used with drop() and freeze()/unfreeze()

    xform.loadInputModels(Collections.singletonMap("<in_domain_name>", "<path_to_model>"));
    xform.execute();
    xform.saveOutputModels(Collections.singletonMap("<out_domain_name>", "<path_to_model>"));
    ```

=== "Kotlin"

    ```kotlin
    val resource = YAMTLModule.preloadMetamodel("<path_to_metamodel>")
    val xform = XForm(resource.contents[0])
    xform.setInplace(true) // enables the in-place transformation semantics
    xform.setWithStagedExecution(false) // YAMTL to use one match at a time
    xform.enableUpdateExtent(false) // to be used with drop() and freeze()/unfreeze()

    xform.loadInputModels(mapOf("<in_domain_name>" to "<path_to_model>"))
    xform.execute()
    xform.saveOutputModels(mapOf("<out_domain_name>" to "<path_to_model>"))
    ```


!!! info "In-place semantics and fetch()"

    The mapping from input match to output match is traced as a transformation step in the out-place semantics only. In the in-place semantics, transformation steps are not traced and the `fetch()` operation cannot be used to resolve references to output objects from input objects (or the matches that contain them). The reason is that the transformation executes modifications on the input model, and references to objects in that model are reachable and need not be resolved using `fetch()`.

    

## YAMTL Header

A YAMTL header is a configuration section within a YAMTL transformation module that specifies the input and output domains for the transformation. It serves as the signature of the transformation, defining which metamodels (EPackage instances) are used for the source (input) and target (output) models.

The purpose of the YAMTL Header is as follows:

1. **Define Input and Output Models**: The header specifies the metamodels for the input and output domains, establishing the types of models that the transformation will work with.
2. **Set Transformation Context**: It provides context for the transformation rules, ensuring that the rules can refer to the correct metamodels and their elements.
3. **Initialization**: It initializes the transformation module with the necessary metadata about the models, enabling the YAMTL engine to understand the structure and elements of the input and output models.

The header is usually defined within the constructor of a class that extends `YAMTLModule`. It uses the `header()` method to declare the input and output domains, followed by the specification of rules and helpers.

Each component of a header is called domain. In YAMTL, the following component types are supported:

1. **Input Domain (`in`)**: Specifies the name and EPackage of the input model domain for out-place transformations.
   - Example: `.in("sourceDomain", pk1)`

2. **Input/Output Domain (`inOut`)**: Specifies the name and EPackage of an input/output model domain for in-place transformations.
   - Example: `.out("targetDomain", pk2)`

3. **Output Domain (`out`)**: Specifies the name and EPackage of the output model domain for out-place transformations.
   - Example: `.out("targetDomain", pk2)`

The header is used as follows:

- **Rule Definitions**: The rules defined in the transformation module use the domains specified in the header to match and transform elements. For instance, a rule might match elements from the input domain and create corresponding elements in the output domain.
  
- **Model Loading**: When executing the transformation, the models corresponding to the input and output domains are loaded based on the header configuration.
  
- **Helper Functions**: Helpers defined in the module can use the domains to perform operations on the models, like `allInstances()`, ensuring that they work within the correct context.

The YAMTL header is essential for setting up the transformation context, ensuring that the transformation rules and helpers operate within the correct metamodel framework. The following constraints should be considered:

1. Using `inOut` domains enables [in-place semantics](#in-place-semantics), and `in`/`out` domains must be avoided in such cases. Conversely, `in`/`out` domains enable [out-place semantics](#out-place-transformation-semantics) and [pattern-matching semantics](#pattern-matching-semantics) and must not be used with `inOut` domains.
2. Using several `in`/`out` domains for out-place transformations or model patterns, as well as using several `inOut` domains for in-place transformations, leads to multi-model transformation. A **multi-model transformation** enables the use of the pattern matcher across domains, for example, to define constraints over different metamodels, and facilitates the production of multiple output models. In a multi-model transformation, whenever we refer to a specific type (in object element patterns for `in`/`out` patterns of rules or in `allInstances()`), we must specify which domain the class belongs to. This is necessary to avoid confusion when the same metamodel is used for multiple domains.


## YAMTL Rules

YAMTL is as expressive as ATL so it also has a lot of optional operations. These options provide a more thorough (full) syntax for the language.

``` yamtl-groovy
rule("<name>")
    [.inheritsFrom(<ruleNameList>)]? 
    [.isAbstract()]? 
    [.isLazy() | .isUniqueLazy()]? 
    [.isTransient()]?
    {
        .in("<in_object_name>", (<domain_name>,)? <in_object_type>) 
        [(.filter(<FILTER>) | .derivedWith(<QUERY>))]?
    }+
    [.using("<var_name>", <QUERY>)]*
    [.globalFilter(<FILTER>)]?
    {
        .out("<out_object_name>", (<domain_name>,)? <out_object_type>, <ACTION>)
        [.overriding()]?
        [.drop()|.freeze()|.unfreeze()]?
    }+
    [.endWith(<ACTION>)]?
    [.priority(P)]?
```

!!! info "Legend"
    
    `<>` indicates user-definable expressions, `[]?` means optional, `[]*` means operation can occur 0 or more times, `{}+` means operation can occur 1 or more times. These symbols are not part of the actual YAMTL syntax.

YAMTL has two types of input elements: **matched** and **derived**. Matched elements are initialized using YAMTL's matching algorithm, whereas derived elements are initialized using a contextual query and are dependent on at least one matched element. Intuitively, each rule has at least one matched input element as you would expect.

Every rule has several options for additional customization. They will be discussed from top to bottom of the full syntax provided above:

* The ``inheritsFrom(<ruleNameList>)`` operation is declared when the current [rule inherits from parent rule(s)](#rule-inheritance) where ``ruleNameList`` is a comma-separated list of strings and the order of inheritance is specified sequentially. An optional ``abstract`` tag is used for abstract rules which cannot be matched automatically or applied. 
* [Lazy rules](#lazy-rules) can be declared with ``isLazy()`` or `isUniqueLazy()`. These rules are only applicable when the matched input elements are explicitly provided using an expression involving the operation ``fetch``. 
* A rule defined as `isTransient()` does not persist the target (output) elements when the target model flushes to physical storage.

The **input pattern** in a rule determines where the rule should be applied and it consists of at least one input element, which can be configured with the following options:
* In multi-model transformations, the `in` element must specify the domainName that it refers to.
* A ``filter(<FILTER>)`` clause enables the user to add a local filter condition that needs to be satisfied by the matched object of the corresponding input element. 
* A ``derivedWith(<QUERY>)`` clause is used to declare an input element as **derived** where ``QUERY`` is a lambda expression of the "EObject" type used to calculate the value of the match. 

Rules can be equipped with **local variables** that can be initialized with using the matched variables. Such local variables are helpful for holding primitive values obtained from the matched objects. These are declared with the block `.using("<var_name>", <QUERY>)`, where `<var_name>` is the name of the variable, and `<QUERY>` is an expression of type `Supplier<Object>`, which should return the variable value. Local variables can then be used in global filters and actions, both in `out` elements and in the block `endWith`.

A **global filter** condition for a rule can be added after the input element block using `globalFilter(<FILTER>)` clause which allows the user to add filter(s) applicable to the global scope of the rule.

The **output pattern** of a rule defines the side effects of the rule and consists of at least one output element, which can be configured with the following options:
* In multi-model transformations, the `out` element must specify the domainName that it refers to.
* An ``overriding()`` qualifier is used to override inherited action expression(s) in the output element of a descendant rule, as discussed in [rule inheritance](#rule-inheritance).
* Elements that are used both as input and output can be managed using the options ``.drop()`` or `.freeze()/.unfreeze()`, as explained in the [Subsection In-place Semantics](#in-place-semantics).

Rules can also have the option ``endWith(<ACTION>)`` to define an optional ``<ACTION>``, of type `Runnable`, that can refer to any of the rule's elements and any local variables. Note that the ``endWith()`` method is purely for convenience: it enables performing actions at the end of the rule execution for each particular match. 

To change the **priority** of a rule, you can use the ``priority(P)`` operation where P is a "long" value. Rules with lower priority are applied first by the YAMTL matching algorithm. Additionally, YAMTL provides attribute helpers for computing values during the initialization of the model transformation. 

The helpers are defined in  the block ``helperStore()`` of the the transformation's constructor. The helper syntax ``Helper("<helperName>")`` is used to define an attribute helper with the name in single quotes and is followed by a query lambda expression enclosed in square brackets. 


## Lazy Rules

Lazy rules, similar to matched rules, transform input objects into output objects. However, unlike matched rules that apply automatically, lazy rules must be explicitly invoked. This can be achieved using the fetch() operation. Since they only execute when called, they produce outputs based on specific inputs without unnecessary runs. This ensures that transformations only occur when required, enhancing both modularisation and efficiency.

There are two types of lazy rules:

* **Standard Lazy Rules** (`isLazy()`): These are the basic form of lazy rules. Once called, they take specified input elements from the input model and produce corresponding output elements in the output model. However, if invoked multiple times with the same inputs, they may produce redundant output elements. A typical use case that illustrates the use of rules `isLazy()` is for maintaining a trace or log of all transformation steps, as redundant objects can act as a record of every individual transformation invocation, even if they are from the same input.
* **Unique Lazy Rules** (`isUniqueLazy()`): These are an enhanced version of the standard lazy rules. The primary distinction is their guarantee of execution uniqueness. If a unique lazy rule is called more than once with the same input elements, it ensures that the transformation occurs only once. This means that the result of the initial call is cached and reused for subsequent calls with identical inputs, preventing the generation of duplicate output elements. Unique lazy rules repurpose the declarative semantics of matched rules with a lazy evaluation strategy.

A lazy rule, whether unique or non-unique, requires explicit invocation to produce an output element. This is executed by using the rule name using the fetch operation as follows:

*   `fetch(<input_matched_object>, <out_object_name>, <rule_name>)` for lazy rules with a single input object and multiple output objects.
*   `fetch(<input_matched_object>, <out_object_name>, <rule_name>, <i>)` for `toMany` lazy rules with a single input object and multiple output objects.
*   `fetch(<input_matched_object>, <out_object_name>, <rule_name>, <argsMap>)` for lazy rules with a single input object and multiple output objects that, in addition, are parameterized. `<argsMap>` is a map of type `Map<String,Object>`, where the keys are parameter names and the values are the actual parameter values.


## ToMany Rules


Matched rules can be declared with the modifier `toMany` to enable repeated rule applications to the same input object, using `toManyCap` to indicate how many rule applications should be performed. With `toMany` rules, the same rule might match the same object multiple times. In such cases, we can reference each match (occurrence 'i' of a match) by the order in which they occurred: `fetch(<input_matched_object>, <i>)` will return the output object created by the ith match.

Declaring a rule with the modifier `toMany` adds the variable `matchCount` to the execution environment, which is used to distinguish the different rule applications starting from `0` for the first application. This variable is available during both pattern matching and transformation execution. This means that the variable `matchCount` can be used in filter expressions

The property `toManyCap` receives a function of type `Supplier<Integer>`, which determines the total number of rule applications that should apply to the same match.

When declaring rules using rule inheritance together with the modifier `toMany()`, all rules in the inheritance hierarchy must be `toMany()`.

!!! info "Differences with Lazy Rules"

    A matched rule that is `toMany` is scheduled by the tranformation engine and not called on demand. However, when it is matched, the same match is associated with a list of rule applications. While the match is still unique for a particular rule, it is shared among several of the rule applications.


## Rule Inheritance

Rule inheritance in YAMTL enables a transformation developer to create a new transformation rule by inheriting the behaviour of multiple existing rules. This mechanism simplifies the transformation process by allowing you to build on existing rule logic without duplicating code, promoting code reuse and encapsulation.

The following characteristics define multiple rule inheritance in YAMTL:

* **Abstract rules**: Abstract rules are defined with the clause `.isAbstract()`. These rules typically act as templates or base rules that other rules can inherit from. These rules are not executed directly and their input/output pattern elements may refer to abstract classes.
* **Concrete rules** are rules that are executed if a valid match is found for the input pattern and the output pattern can only refer to concrete classes, i.e., those that can be instantiated in the output model.
* A descendant rule can inherit from one or several parent rules using the clause ``inheritsFrom(<ruleNameList>)``, where `<ruleNameList>` is of type `List<String>`.

When using rule inheritance, rules are expected to be **covariant** both in input elements and in output elements with respect to inheritance relationships in the corresponding metamodels. When an input or an output element is declared in a parent rule but not declared in a child rule, it is implicitly inherited. The semantics of a transformation rule with respect to inheritance is as follows: 

* **Pattern matching semantics**. In **matched** input elements, filter expressions are inherited using a leftmost top-down evaluation strategy w.r.t. the inheritance hierarchy defined in clauses ``inheritsFrom(<ruleNameList>)``. When an input element `in("<in_object_name1>", <in_object_type1>).filter{ <FILTER1> }` is declared in a parent rule but it is not declared in a descendant rule, it is inherited. If the input element `in("<in_object_name1>", <in_object_type2>).filter{ <FILTER2> }` is also defined in a descendant rule, `<FILTER2>` refines `<FILTER1>` by adding more constraints. In other words, both `<FILTER1>` and `<FILTER2>` must be satisfied by a match for the descendant rule. In addition, `<in_object_type2>` can be a subclass of `<in_object_type1>`. In **derived** input elements, derivation expressions (``derivedWith(<QUERY>)``) are overriden if they are declared in a descendant rule or simply inherited otherwise.  
* **Transformation execution semantics**. In output elements, action expressions are also inherited following a leftmost top-down evaluation strategy w.r.t. the inheritance hierarchy by default. When an output element `out("<out_object_name>", <out_object_type1>, { <ACTION1> })` in a parent rule is refined by an output element `out("<out_object_name>", <out_object_type2>, { <ACTION2> })` in a descendant rule, where `<in_object_type2>` may be a subclass of `<in_object_type1>`, then both `<ACTION1>` and `<ACTION2>` will be executed, in that order. The default behaviour can be overriden by using the qualifier `overriding()` in the corresponding output element of a descendant rule. When using `overriding()` in an output element, the parent action `<ACTION1>` is not executed.

The following table summarizes the errors that YAMTL detects when parsing model transformation rules when rule inheritance is used:

| Scope | Error Description | Explanation | Resolution |
| --- | --- | --- | --- |
| Rule | Abstract Rule with No Children Rules | An abstract rule should have at least one child rule. | Define child rules for the abstract rule or consider making it non-abstract if no child rules are intended. |
| Rule | Concrete Rule Specialized by an Abstract Rule | Occurs when a concrete rule is specialized by an abstract rule, which is not allowed. | Ensure that concrete rules are not specialized by abstract rules. |
| Input | Incompatible Input Element Types | Occurs when an input element's type in a descendant rule is not a subtype of the same input element's type in a parent rule. | Make sure that the types of input elements in the descendant rule are compatible with those in the parent rule. |
| Input | Mismatched Nature of Input Elements | Occurs when an input element's nature (matched/derived) differs between a rule and its parent rule. | Ensure that the nature of input elements is consistent between the descendant rule and its parent rule. |
| Input | Input Element Inherited from Two Separate Parent Rules | An input element cannot be inherited from two separate parent rules. | Avoid inheriting the same input element from two separate parent rules to prevent conflicts. |
| Output | Output Element Declared as 'Overriding' with No Parent Rule | Occurs when an output element is declared as 'overriding', but there is no parent rule to override. | Remove the 'overriding' declaration or ensure that the rule has a valid parent rule. |
| Output | Incompatible Output Element Types | Occurs when an output element's type in a descendant rule is not a subtype of the same output element's type in a parent rule. | Ensure that the types of output elements in the descendant rule are compatible with those in the parent rule. |
| Output | Output Element Declared as 'Drop' with No Valid Input Element | Occurs when an output element is declared as 'drop', but it does not refer to a valid input element. | Check that the 'drop' declaration references a valid input element, or remove it if unnecessary. |
| Output | Output Element Inherited from Two Parent Rules with Different Types | An output element cannot be inherited from two parent rules with incompatible types; this results in an error. | Ensure that the types of inherited output elements are compatible between parent rules. |
| Output | Rule Inherits the Same Output Element from Two Parent Classes | When a rule inherits the same output element from two parent classes, it's a potential issue, and a warning is issued. | Review the rule's inheritance structure and consider if it leads to unintended behavior. |

When a descendant rule inherits the same output element from two different parent rules, situation known as the [diamond problem](https://en.wikipedia.org/wiki/Multiple_inheritance#the-diamond-problem), YAMTL detects the situation and warns the user but the model transformation proceeds using inheritance semantics as explained above.


!!! tip Using Rule Inheritance to Optimize Run Time

    During pattern matching, YAMTL selects the most generic rules first. When a match is found for the parent rule, it then processes the match with the input pattern of the descendant rules using a depth-first strategy.

!!! info Multiple Rule Inheritance 

    In the original YAMTL semantics, YAMTL supported multiple rule inheritance in both input patterns and output patterns. Since version 0.3.6, multiple inheritance only applies to output patterns in rules. This feature has been deprecated to facilitate more concise syntax when specifying input patterns in rules.


## Helpers

A helper in YAMTL streamlines the writing of transformation rules by offering reusable expressions. Think of it as creating utility functions or methods in conventional programming languages.

In YAMTL, you can define helpers using standard constructs from the host programming language:

*   **Attributes** with initialization expressions.
*   **Static operations** that apply at the class level across all instances.
*   **Operations** specific to objects.

YAMTL further boosts these helpers' utility by caching their computations, optimizing runtime performance. Below, we present how to declare these helpers and call them in your transformations.

### Attribute Helpers

The method `staticAttribute("<name>", <BODY>)` creates an attribute `<name>`. Its value gets determined by the `<BODY>` expression, which must be of type `Supplier<Object>`.

Attribute helpers shine when used with the `allInstances(<EClass>)` operation. This operation fetches a list containing all instances of the type `<EClass>` present in the input model. The expression `<BODY>` must return the value used to initialize the attribute, which can be an `EObject` or a primitive value.

=== "Groovy"

    ``` yamtl-groovy
    staticAttribute("<AttributeName>", {  
        // an expression returning a value from allInstances(<InputEClass>)
    })
    ```

=== "Xtend"

    ``` yamtl-xtend
    staticAttribute("<AttributeName>", [|  
        // an expression returning a value from allInstances(<InputEClass>)
    ])
    ```

=== "Java"

    ``` yamtl-java
    staticAttribute("<AttributeName>", new Supplier<Object>() {  
        @Override
        public Object get() {
            // an expression returning a value from allInstances(<InputEClass>)
        }
    });
    ```

=== "Kotlin"

    ```yamtl-kotlin
    staticAttribute("<AttributeName>") {  
        // an expression returning a value from allInstances(<InputEClass>)
    }
    ```

An attribute helper can then be called by name. While the YAMTL Groovy DSL allows us to consider the attribute helper as a variable using its name (without the String quotes) directly, the operation `fetch` needs to be used in all other programming languages:

=== "Groovy"

    ```groovy
    <AttributeName>
    ```

=== "Xtend"

    ``` yamtl-xtend
    fetch("<AttributeName>")
    ```

=== "Java"

    ``` yamtl-java
    fetch("<AttributeName>")
    ```

=== "Kotlin"

    ``` yamtl-kotlin
    fetch("<AttributeName>")
    ```

### Static Operation

To manage static methods, YAMTL uses `staticOperation("<name>", <FUNCTION>)` to define an operation `<name>` where `<FUNCTION>` is a lambda expression with a list of parameters specified as a map. The keys in the map are the names of the parameters, and the values are the actual arguments. Within the body of the lambda expression, you can access the arguments map using `argMap` and must ensure to return a value.

=== "Groovy"

    ``` yamtl-groovy
    staticOperation("<OperationName>", { argMap -> 
        // returns the value of the parameter with name <param_name>
        argMap.<param_name> 
    })
    ```

=== "Xtend"

    ``` yamtl-xtend
    staticOperation("<OperationName>", [ argMap | 
        // returns the value of the parameter with name <param_name>
        argMap.get("<param_name>")
    ])
    ```

=== "Java"

    ``` yamtl-java
    staticOperation("<OperationName>", argMap -> {
        // returns the value of the parameter with name <param_name>
        return argMap.get("<param_name>");
    });
    ```

=== "Kotlin"

    ``` yamtl-kotlin
    staticOperation("<OperationName>") { argMap ->
        // returns the value of the parameter with name <param_name>
        argMap["<param_name>"]
    }
    ```

Static operations are invoked by their names and the list of arguments, specifying the name of the parameter and the actual argument value. While the YAMTL Groovy DSL allows calling the static operation directly, all other programming languages require the `fetch` operation:

=== "Groovy"

    ``` yamtl-groovy
    <OperationName>(["<param1>" : <value1>, ...])
    ```

=== "Xtend"

    ``` yamtl-xtend
    fetch("<OperationName>", #["<param1>" -> <value1>, ...])
    ```

=== "Java"

    ``` yamtl-java
    fetch("<OperationName>", Map.of("<param1>", <value1>, ...));
    ```

=== "Kotlin"

    ``` yamtl-kotlin
    fetch("<OperationName>", mapOf("<param1>" to <value1>, ...))
    ```

### Contextual Operation

To manage class methods, YAMTL uses `contextualOperation("<name>", <BIFUNCTION>)` to define an operation `<name>` where `<BIFUNCTION>` is a lambda expression with two parameters: the contextual instance or object to which the operation is applied, and list of parameters specified as a map. The keys in the map are the names of the parameters, and the values are the actual arguments. Within the body of the lambda expression, you can access the contextual instance or the arguments map, and must ensure to return a value, either an `EObject` or a primitive value.

=== "Groovy"

    ``` yamtl-groovy
    contextualOperation("<OperationName>", { obj, argMap -> 
        // to access the contextual instance use 'obj' 
        // to access an argument use 'argMap.<param_name>' 
        // must return a value
    })
    ```

=== "Xtend"

    ``` yamtl-xtend
    contextualOperation("<OperationName>", [ obj, argMap | 
        // to access the contextual instance use 'obj' 
        // to access an argument use 'argMap.get("<param_name>")' 
        // must return a value
    ])
    ```

=== "Java"

    ``` yamtl-java
    contextualOperation("<OperationName>", (obj, argMap) -> {
        // to access the contextual instance use 'obj'
        // to access an argument use 'argMap.get("<param_name>")'
        // must return a value
    });
    ```

=== "Kotlin"

    ``` yamtl-kotlin
    contextualOperation("<OperationName>") { obj, argMap ->
        // to access the contextual instance use 'obj'
        // to access an argument use 'argMap["<param_name>"]'
        // must return a value
    }
    ```

Contextual operations are invoked on the `<ContextualInstance>` using the `<OperationName>` and the list of arguments, specifying the name of the parameter and the actual argument value. While the YAMTL Groovy DSL allows calling the  operation directly, all other programming languages require the `fetch` operation:

=== "Groovy"

    ``` yamtl-groovy
    <OperationName>(<ContextualInstance>, ["<param1>" : <value1>, ...])
    ```

=== "Xtend"

    ``` yamtl-xtend
    <ContextualInstance>.fetch("<OperationName>", #["<param1>" -> <value1>, ...])
    ```

=== "Java"

    ``` yamtl-java
    fetch(<ContextualInstance>, "<OperationName>", Map.of("<param1>", <value1>, ...));
    ```

=== "Kotlin"

    ``` yamtl-kotlin
    fetch(<ContextualInstance>, "<OperationName>", mapOf("<param1>" to <value1>, ...))
    ```

## Commands

### `fetch()`

The fetch operation in YAMTL, `YAMTLModule::fetch()`, is used to retrieve output objects that correspond to given input objects through the application of transformation rules. The main purpose of `fetch()` is to resolve references to output objects that are created by other rules. Since rules in YAMTL transformations execute independently, they cannot directly access the output objects produced by other rules. The fetch operation serves as a bridge to connect these separate rule contexts.

When a rule's action needs to reference an output element initialized by another rule, it uses fetch with the input object to look up the corresponding output object. For example, `fetch(input_object)` returns the output object created by the rule that matched `input_object`.

#### Multiple elements in the Input Pattern

When the input pattern contains more than one element, instead of using one single input object, a [valid match](#pattern-matching-semantics) must be provided by using a map where the keys are ``<in_object_name>``s and the values are the matched `EObject`s. The match must contain an `in` element for each `in` object patterns in the input pattern of the rule.

=== "Groovy"

    ```groovy
    fetch(['in_var1': eObject1, 'in_var2': eObject2, ...])
    ```

=== "Xtend"

    ```xtend
    fetch(#{'in_var1' -> eObject1, 'in_var2'-> eObject2, ...})
    ```

=== "Java"

    ```java
    fetch(Map.of("in_var1", eObject1, "in_var2", eObject2, ...))
    ```

=== "Kotlin"

    ```kotlin
    fetch( mapOf("in_var1" to eObject1, "in_var2" to eObject2, ...) )
    ```


#### Multiple Elements in the Input Pattern in Multi-Model Transformations

When specifying input patterns across domains in multi-model transformations, you can resolve output objects by presenting `fetch()` with a set of matches, specifying lists of objects for each domain in the match. `fetch()` will internally apply pattern matching with transformation rules in the rule store and return a list of objects for the default output variable. Refer to the next section for cases where there is more than one `out` variable.

=== "Groovy"

    ```groovy
    fetch(['in_var1': [eObject1, ...], 'in_var2': [eObject2, ...], ...])
    ```

=== "Xtend"

    ```xtend
    fetch(#{'in_var1' -> #[eObject1, ...], 'in_var2' -> #[eObject2, ...], ...})
    ```

=== "Java"

    ```java
    fetch(Map.of(
        "in_var1", List.of(eObject1, ...),
        "in_var2", List.of(eObject2, ...),
        ...
    ));
    ```

=== "Kotlin"

    ```kotlin
    fetch(
        mapOf(
            "in_var1" to listOf(eObject1, ...),
            "in_var2" to listOf(eObject2, ...),
            ...
        )
    )
    ```


#### Multiple Elements in the Output Pattern

When the output pattern comprises several object patterns, it's necessary to specify which output element we wish to fetch: `fetch(<input_matched_object>, "<out_var_name>")` will return the output object linked to the output element `outVarName`. If a matched rule with a complex output pattern also uses the `toMany` declaration, the output object can be retrieved with `fetch(<input_matched_object>, "<out_var_name>", <i>)`.

#### Calling Lazy Rules

The fetch operation is the only mechanism available to execute lazy rules, as explained in the [subsection Lazy Rules](#lazy-rules).
  
#### Calling Helpers

In JVM languages, other than Groovy, the fetch operation is also used to call helpers, as explained in the [subsection Helpers](#helpers).

#### Handling ToMany Rules

ToMany rules can be applied to the same input object multiple times. In such cases, we can retrieve the output objects obtained in each rule application using the operation fetch(), as explained in the [subsection ToMany Rules](#tomany-rules).

#### Variables in Execution Context

In JVM languages, other than Groovy, the fetch operation is also used to call helpers, fetch variables from the execution environment, with the expression `fetch("<variable-name>")`.


### `allInstances(EClass)`

The `allInstances(<typeName>)` operation is used to create OCL-like queries in lambda expressions and can be invoked in any of the following expressions: `<FILTER>`, `<QUERY>`, and `<ACTION>`.

`allInstances(<typeName>)` returns the collection of objects of type `<typeName>` in the input model. In multi-model transformations, it is necessary to specify the `<domainName>` of the corresponding domain `in` or `inOut` in the transformation header, as follows: `allInstances(<domainName>, <typeName>)`. This retrieves a collection of objects of type `<typeName>` from the domain `<domainName>` only. 

Note that `out` domains cannot be queried with `allInstances()`. Output objects can only be fetched via the operator `fetch()`.

<!--

### Implicit fetch()

When using the YAMTL Groovy dialect, `fetch()` is used implicitly when the input object (or list of input objects) can be resolved using matched rules that have a single `out` element, ensuring no disambiguation is required. In such cases, the following expressions will work correctly by resolving the input object `<inVar>` using `fetch` implicitly:

```groovy
<outVar>.<feature> = <inVar>
<outVar>.<feature>.add(<inVar>)
<outVar>.<feature>.addAll([<inVar>])
```

This implicit fetching mechanism simplifies the code by automatically handling the resolution of input objects through the appropriate matched rules.

-->




## Module Composition

YAMTL modules can be imported and used in other Xtend/Java/Groovy classes by creating instances of their main classes. This allows you to reuse the functionality provided by a YAMTL module within your code. A YAMTL module can also incorporate any Java Virtual Machine (JVM) library, extending its functionality by using external code.

Module extension is used for composing modules i.e. creating a subclass of an existing module to extend the capabilities of the base module. When YAMTL modules are extended, the process of initializing rules and attribute helpers begins from the root modules (those that do not extend any other module). Initialization then proceeds along the hierarchy of extended modules, moving from parent modules to their descendants.

When a specializing module declares a rule that is already defined in the parent module (by name), the new rule overrides the existing one. Rules in the parent module can also be extended using rule inheritance.


## Incremental Model-to-Model Transformations

By default model-to-model transformations in YAMTL transformations are executed in **batch mode**, where the entire input model is read and a new output model is produced from scratch. However, this approach can be inefficient when dealing with large models or when only a small portion of the model undergoes changes. To address this limitation, incremental model-to-model transformations have emerged as a more efficient alternative.

**Incremental** model-to-model transformations in YAMTL extend the capabilities of standard transformations by maintaining a relationship between the source and target models. Rather than reprocessing the entire model, these transformations update only the parts of the target model that correspond to changed elements in the source model. This results in an increase in computational efficiency, particularly in scenarios where models are large, or changes are frequent but localized. 

Incremental transformations are commonly used in the following scenarios:

*  **Real-Time Systems**: In real-time systems where immediate responsiveness is essential, incremental transformations can deliver results more rapidly.
*  **Collaborative Modeling**: In environments where multiple individuals are modifying a model simultaneously, incremental transformations help maintain a coherent and updated version of the target model.
*  **Continuous Integration**: Incremental transformations are beneficial for continuous development pipelines that require constant model updates.

YAMTL support for the incremental evaluation of model transformations relies on the following components:

* Tracking transformation steps. Every application of a transformation rule to an input model constitutes a transformation step, which associates an input match with a corresponding output match. 
In YAMTL, this tracking occurs implicitly, eliminating the need for user-initiated manual intervention. YAMTL also supports explicit mechanisms for tracking transformation steps.
* Tracking feature calls. Structural features in the input model, typically corresponding to objects matched by the input pattern of a rule, are employed for computations within `<FILTER>`, `<QUERY>`, or `<ACTION>` blocks. YAMTL can identify the usage of an accessor method that commences with the get prefix to access a structural feature of an object in the input model. This detection is facilitated through aspect-oriented programming. To enable this functionality, the user must configure the YAMTLModule with the namespace containing the input model's classes. This is accomplished via the configuration option xform.adviseWithinThisNamespaceExpressions(`<namespaceList>`);, where xform is the YAMTLModule containing rule definitions, and `<namespaceList>`, of type `List<String>`, enumerates the namespaces to be instrumented with aspects. A namespace may be specified as a fully qualified package name, such as com.a.y, or may encompass a set of packages using `..*`, like  `com.a.y.*`, which includes package `com.a.y` and its direct subpackages, or `com.a.y..*`, which includes package `com.a.y` and *all* its subpackages.
* Tracking changes in a model. Model changes can be classified into two categories: on-the-fly and offline changes. **On-the-fly** changes involve real-time modifications to the objects within a model in memory, whereas **offline** changes pertain to the application of a distinct model describing these alterations. YAMTL employs the EMF Adapter Framework for handling on-the-fly modifications, and utilises the EMF Change Model for processing offline changes. The EMF Change Model is equipped with a change recorder that is capable of serialising the in-memory change description model in XMI format.

The execution of an incremental model transformation in YAMTL is performed in two stages:

* **Initial stage**. The model transformation is executed in batch mode and YAMTL stores transformation steps.
* **Change propagation stage**. Given a source model change (either on-the-fly or offline), YAMTL analyses the impact of the change on the model transformation and only re-evaluates those transformation steps that are affected.

### Template to execute model transformations

The following example code snippets illustrate how to configure and execute a transformation in YAMTL using different programming languages.

#### Using On-the-Fly Changes

The code snippets below ilustrate how to execute a model transformation in incremental mode, making a change to the input model once it has been transformed with `YAMTLModule::execute()`. 

=== "Groovy"
    ```groovy
    // CONFIGURATION
    def xform = new XForm()
    YAMTLGroovyExtensions.init(this)		
    xform.adviseWithinThisNamespaceExpressions(<namespaceList>);
    xform.executionMode = ExecutionMode.INCREMENTAL
    xform.loadInputModels(["<in_domain_name>": "<path_to_model>"])
    // INITIAL TRANSFORMATION
    xform.execute()
    // DELTA PROPAGATION
    xform.adaptInputModel("<in_domain_name>")
    /* CHANGES TO MODEL HERE */
    xform.propagateDelta("<in_domain_name>")
    xform.saveOutputModels(["<out_domain_name>": "<path_to_model>"])
    ```

=== "Xtend"
    ```xtend
    // CONFIGURATION
    val xform = new XForm()
    xform.adviseWithinThisNamespaceExpressions(<namespaceList>)
    xform.executionMode = ExecutionMode.INCREMENTAL
    xform.loadInputModels(#{'<in_domain_name>' -> '<path_to_model>'})
    // INITIAL TRANSFORMATION
    xform.execute
    // DELTA PROPAGATION
    xform.adaptInputModel('<in_domain_name>')
    // CHANGES TO MODEL HERE
    xform.propagateDelta('<in_domain_name>')
    xform.saveOutputModels(#{'<out_domain_name>' -> '<path_to_model>'})
    ```

=== "Java"
    ```java
    // CONFIGURATION
    XForm xform = new XForm();
    xform.adviseWithinThisNamespaceExpressions(<namespaceList>);
    xform.setExecutionMode(ExecutionMode.INCREMENTAL);
    xform.loadInputModels(Map.of("<in_domain_name>", "<path_to_model>"));
    // INITIAL TRANSFORMATION
    xform.execute();
    // DELTA PROPAGATION
    xform.adaptInputModel("<in_domain_name>");
    // CHANGES TO MODEL HERE
    xform.propagateDelta("<in_domain_name>");
    xform.saveOutputModels(Map.of("<out_domain_name>", "<path_to_model>"));
    ```

=== "Kotlin"
    ```kotlin
    // CONFIGURATION
    val xform = XForm()
    xform.adviseWithinThisNamespaceExpressions(<namespaceList>)
    xform.setExecutionMode = ExecutionMode.INCREMENTAL
    xform.loadInputModels(mapOf("<in_domain_name>" to "<path_to_model>"))
    // INITIAL TRANSFORMATION
    xform.execute()
    // DELTA PROPAGATION
    xform.adaptInputModel("<in_domain_name>")
    // CHANGES TO MODEL HERE
    xform.propagateDelta("<in_domain_name>")
    xform.saveOutputModels(mapOf("<out_domain_name>" to "<path_to_model>"))
    ```

Incremental transformations are activated by setting the execution mode to `ExecutionMode.INCREMENTAL`.

The YAMTL engine is instructed on the locations for instrumenting `getter` methods through the statement `xform.adviseWithinThisNamespaceExpressions(<namespaceList>)`, specifying the pertinent package names.

For change tracking, the `xform.adaptInputModel("<in_domain_name>")` statement is used to instrument the input model with EMF adapters. It is important to abstain from adapting the model prior to invoking `execute()`, in order to minimise the extent of changes requiring monitoring. Changes are made by accessing objects in the `Resource` of the input model, which can be accessed using `xform.getModelResource("<in_domain_name>")`, and applying changes to their structural features.

Subsequently, the `xform.propagateDelta("<in_domain_name>")` statement facilitates the propagation of any changes made from the input model to the output model.

#### Using Offline Changes

=== "Groovy"
    ```groovy
    // CONFIGURATION
    def xform = new XForm()
    YAMTLGroovyExtensions.init(this)		
    xform.adviseWithinThisNamespaceExpressions(<namespaceList>);
    xform.executionMode = ExecutionMode.INCREMENTAL
    xform.loadInputModels(["<in_domain_name>": "<path_to_model>"])
    // INITIAL TRANSFORMATION
    xform.execute()
    // DELTA PROPAGATION
    xform.loadDelta("<in_domain_name>", "<deltaName>", "<path/to/delta/file.xmi>")
    xform.applyAndPropagateDelta("<in_domain_name>", "<deltaName>")
    xform.saveOutputModels(["<out_domain_name>": "<path_to_model>"])
    ```

=== "Xtend"
    ```xtend
    // CONFIGURATION
    val xform = new XForm()
    xform.adviseWithinThisNamespaceExpressions(<namespaceList>)
    xform.executionMode = ExecutionMode.INCREMENTAL
    xform.loadInputModels(#{'<in_domain_name>' -> '<path_to_model>'})
    // INITIAL TRANSFORMATION
    xform.execute
    // DELTA PROPAGATION
    xform.loadDelta("<in_domain_name>", "<deltaName>", "<path/to/delta/file.xmi>")
    xform.applyAndPropagateDelta("<in_domain_name>", "<deltaName>")
    xform.saveOutputModels(#{'<out_domain_name>' -> '<path_to_model>'})
    ```

=== "Java"
    ```java
    // CONFIGURATION
    XForm xform = new XForm();
    xform.adviseWithinThisNamespaceExpressions(<namespaceList>);
    xform.setExecutionMode(ExecutionMode.INCREMENTAL);
    xform.loadInputModels(Map.of("<in_domain_name>", "<path_to_model>"));
    // INITIAL TRANSFORMATION
    xform.execute();
    // DELTA PROPAGATION
    xform.loadDelta("<in_domain_name>", "<deltaName>", "<path/to/delta/file.xmi>");
    xform.applyAndPropagateDelta("<in_domain_name>", "<deltaName>");
    xform.saveOutputModels(Map.of("<out_domain_name>", "<path_to_model>"));
    ```

=== "Kotlin"
    ```kotlin
    // CONFIGURATION
    val xform = XForm()
    xform.adviseWithinThisNamespaceExpressions(<namespaceList>)
    xform.executionMode = ExecutionMode.INCREMENTAL
    xform.loadInputModels(mapOf("<in_domain_name>" to "<path_to_model>"))
    // INITIAL TRANSFORMATION
    xform.execute()
    // DELTA PROPAGATION
    xform.loadDelta("<in_domain_name>", "<deltaName>", "<path/to/delta/file.xmi>")
    xform.applyAndPropagateDelta("<in_domain_name>", "<deltaName>")
    xform.saveOutputModels(mapOf("<out_domain_name>" to "<path_to_model>"))
    ```

The primary distinction when employing offline changes lies in the provision of changes to the input model via a change description model, as defined by the EMF Change Model[^2]. The statement `xform.loadDelta("<in_domain_name>", "<deltaName>", "<path/to/delta/file.xmi>")` loads the change stored at `<path/to/delta/file.xmi>`, subsequently associating it with the input model identified by `<in_domain_name>` and a user-defined name `<deltaName>`.

[^2]: David Steinberg, Frank Budinsky, Marcelo Paternostro, and Ed Merks. 2009. EMF: Eclipse Modeling Framework 2.0 (2nd. ed.). Addison-Wesley Professional.

For the propagation of this change, it first needs to be applied to the input model and then needs to be propagated to the output model. This is achieved via the statement `xform.applyAndPropagateDelta("<in_domain_name>", "<deltaName>")`.

### Incrementality granularity

YAMTL is an internal DSL of JVM programming languages and specific design decisions have been made in order to reuse as much syntax from the underlying host programming language as possible. In particular, assignments of values to object features (attributes and references) are handled by the assignment statement in the host language.

In general terms, YAMTL checks whether a change invalidates the match of an existing transformation step. If the match is no longer valid, the transformation step is undone. Otherwise, the transformation step will be re-executed according to the following levels of granularity:

* Tranformation step granularity (`IncrementalGranularity.TRAFO_STEP`): When a change impacts any part of a transformation step, the match whole transformation step is re-executed. This is the default granularity level.
* Element granularity (`IncrementalGranularity.ELEMENT`): This is a more refined mode in which YAMTL detects whether a change only affects a particular `in` or `out` element. YAMTL only re-evaluates the filters of affected `in` elements and the actions of affected `out` elements.

The granularity of the incremental evaluation scope is set using the flag ``YAMTLModule::incrementalGranularity``. By default, it is set to `IncrementalGranularity.TRAFO_STEP` and it can be set to `IncrementalGranularity.ELEMENT`.

### Undo

!!! todo 

### Implicit vs explicit traceability

!!! todo

## Examples

* The [Linked list reversal](examples/linked-list-reversal-example.md) example reverses a linked list data structure originally stored in XMI format (source model). YAMTL transformation generates an ``outputList.xmi`` containing the target model. Both source and target metamodels are created using the same ECore file since the data structure remains the same after the transformation. A Gradle test runs a Groovy script that loads the input model, executes the transformation, and saves the output model.

* [Flowchart to HTML](examples/flowchart-to-html-example.md) project looks at transforming flowchart models into valid HTML documents. This project specifically has multiple transformation examples that cover a wide range of YAMTL operations, annotations, and core concepts. This project is perfect for readers who want to take the next step in learning more about the complete functionality of each MTL tool in well-documented bite-sized examples.


## Trade-offs regarding performance

!!! todo 

* Groovy vs Xtend/Java: Groovy offers a more readable syntax
* SpringAOP vs AspectJ: SpringAOP simplifies configuration