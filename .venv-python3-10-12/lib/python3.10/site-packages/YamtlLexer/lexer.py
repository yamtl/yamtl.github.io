# -*- coding: utf-8 -*-
"""
    YAMTL lexer support
    ~~~~~~~~~

    Pygments lexers for YAMTL language variants.

"""

import re
from pygments.lexer import RegexLexer, bygroups, inherit
from pygments.token import *
from pygments.lexers.jvm import GroovyLexer, JavaLexer, XtendLexer, KotlinLexer
from pygments import unistring as uni

__all__ = ['YamtlGroovyLexer', 'YamtlJavaLexer', 'YamtlKotlinLexer', 'YamtlXtendLexer']

class YamtlGroovyLexer(GroovyLexer):
     
    name = 'YAMTL-Groovy'
    url = 'https://yamtl.github.io/'
    aliases = ['yamtl-groovy']
    filenames = ['*.groovy','*.gradle']
    
    tokens = {
        'root': [
            inherit,
        ],
        'base': [
            (r'((?<![\\])[\'"])((?:.(?!(?<![\\])\1))*.?)\1', String),
            (r'(//.*?)(\n)', bygroups(Comment.Single, Whitespace)),
            (r'/\*.*?\*/', Comment.Multiline),
            # Add YAMTL Keywords here
            (r'ruleStore|helperStore', Keyword.Declaration),
            (r'(?<= |\[|,)(rule|staticAttribute|staticOperation|contextualOperation)', Name.Class),
            (r'(\.)(in)(\()', bygroups(Operator, Comment.Preproc, Operator)),
            (r'(\.)(out)(\()', bygroups(Operator, Comment.Preproc, Operator)),
            (r'fetch(?=\()', Name.Entity),
            (r'EPackage|EObject|EClass', Name.Builtin),
            (r'((?<=\)\.)\w+(?=\()|(?<=(  \.))\w+(?=\()|(?<=(\.))\w+(?=\())', Name.Builtin), #May not work with latest Pygments version
            (r'0x[0-9a-fA-F]+', Number.Hex),
            (r'[0-9]+', Number.Integer),
            #(r'(\.)([a-zA-Z_]\w*)', bygroups(Operator, Text)), #If you want to have any word after a dot as classic text (not a keyword)
            inherit,
        #     Explicitly defined keywords (remove   r'((?<=\)\.)\w+(?=\()|(?<=(  \.))\w+(?=\()|(?<=(\.))\w+(?=\())', Name.Builtin)   which highlights any word after a dot)):
        #     (r'((?<=\)\.)filter(?=\(|\{)|(?<=( \.|	\.))filter(?=\(|\{))', Name.Variable.Global),
        #     (r'((?<=\)\.)isAbstract(?=\()|(?<=( \.|	\.))isAbstract(?=\())', Name.Variable.Global),
        #     (r'((?<=\)\.)inheritsFrom(?=\()|(?<=( \.|	\.))inheritsFrom(?=\())', Name.Variable.Global),
        #     (r'((?<=\)\.)overriding(?=\(\))|(?<=( \.|	\.))overriding(?=\(\)))', Name.Variable.Global),
        #     (r'((?<=\)\.)isLazy(?=\(\))|(?<=( \.|	\.))isLazy(?=\(\)))', Name.Variable.Global),
        #     (r'((?<=\)\.)isUniqueLazy(?=\(\))|(?<=( \.|	\.))isUniqueLazy(?=\(\)))', Name.Variable.Global),
        # LOOK AHEAD for ( or {: (?=\(\d*\)|\{))
            #(r'((?<=\)\.)\w+|(?<=( \.|	\.))\w+)', Name.Variable.Global),
        ]}
    
class YamtlJavaLexer(JavaLexer):
     
    name = 'YAMTL-Java'
    url = 'https://yamtl.github.io/'
    aliases = ['yamtl-java']
    filenames = ['*.java']
    
    flags = re.MULTILINE | re.DOTALL
    
    tokens = {
        'root': [
            # Add YAMTL keywords here
            (r'ruleStore|helperStore', Keyword.Declaration),
            (r'rule|staticAttribute|staticOperation|contextualOperation', Name.Class),
            inherit,
        ],
        }
    
class YamtlKotlinLexer(KotlinLexer):
     
    name = 'YAMTL-Kotlin'
    url = 'https://yamtl.github.io/'
    aliases = ['yamtl-kotlin']
    filenames = ['*.kt', '*.kts']
    
    flags = re.MULTILINE | re.DOTALL
    
    kt_name = ('@?[_' + uni.combine('Lu', 'Ll', 'Lt', 'Lm', 'Nl') + ']' +
               '[' + uni.combine('Lu', 'Ll', 'Lt', 'Lm', 'Nl', 'Nd', 'Pc', 'Cf',
                                 'Mn', 'Mc') + ']*')

    kt_space_name = ('@?[_' + uni.combine('Lu', 'Ll', 'Lt', 'Lm', 'Nl') + ']' +
               '[' + uni.combine('Lu', 'Ll', 'Lt', 'Lm', 'Nl', 'Nd', 'Pc', 'Cf',
                                 'Mn', 'Mc', 'Zs')
                + r'\'~!%^&*()+=|\[\]:;,.<>/\?-]*')

    kt_id = '(' + kt_name + '|`' + kt_space_name + '`)'

    modifiers = (r'actual|abstract|annotation|companion|const|crossinline|'
                r'data|enum|expect|external|final|infix|inline|inner|'
                r'internal|lateinit|noinline|open|operator|override|private|'
                r'protected|public|sealed|suspend|tailrec|value')
    
    tokens = {
        'root': [
            # Add YAMTL keywords here
            (r'ruleStore|helperStore', Keyword.Declaration),
            (r'rule|staticAttribute|staticOperation|contextualOperation', Name.Class),
            inherit,
        ],
        'class': [
            inherit,
        ],
        'variable': [
            inherit,
        ],
        'destructuring_assignment': [
            inherit,
        ],
        'function': [
            inherit,
        ],
        'generic': [
            inherit,
        ],
        'modifiers': [
            inherit,
        ],
        'string': [
            inherit,
        ],
        'multiline_string': [
            inherit,
        ],
        'string_common': [
            inherit,
        ],
        'interpolation': [
            inherit,
        ],
        'scope': [
            inherit,
        ]
        }

class YamtlXtendLexer(XtendLexer):
    """
    For Xtend source code.

    .. versionadded:: 1.6
    """

    name = 'YAMTL-Xtend'
    url = 'https://yamtl.github.io/'
    aliases = ['yamtl-xtend']
    filenames = ['*.xtend']

    flags = re.MULTILINE | re.DOTALL
    
    tokens = {
        'root': [
            # Add YAMTL keywords here
            (r'ruleStore|helperStore', Keyword.Declaration),
            (r'(rule|staticAttribute|staticOperation|contextualOperation)(\()', bygroups(Name.Class, Operator)),
            (r'(\.)(in)', bygroups(Operator, Comment.Preproc)),
            (r'(\.)(out)', bygroups(Operator, Comment.Preproc)),
            (r'fetch(?=\()', Name.Entity),
            inherit,
        ],
        'class': [
            inherit,
        ],
        'import': [
            inherit,
        ],
        'template': [
            inherit,
        ],
    }
    
    
