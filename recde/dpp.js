{
	"Token" : [
		{ "Name" : "Var", "Regex" : "var", "ConvertFunction" : "void" },
		{ "Name" : "Int", "Regex" : "int", "ConvertFunction" : "void" },
		{ "Name" : "Identifier", "Regex" : "", "ConvertFunction" : "void" },
		{ "Name" : "Float", "Regex" : "float", "ConvertFunction" : "void" },
		{ "Name" : "Lparen", "Regex" : "(", "ConvertFunction" : "void" },
		{ "Name" : "Rparen", "Regex" : ")", "ConvertFunction" : "void" },
		{ "Name" : "Lbrack", "Regex" : "[", "ConvertFunction" : "void" },
		{ "Name" : "Rbrack", "Regex" : "]", "ConvertFunction" : "void" },
		{ "Name" : "Dot", "Regex" : ".", "ConvertFunction" : "void" },
		{ "Name" : "Plusplus", "Regex" : "++", "ConvertFunction" : "void" },
		{ "Name" : "Minusminux", "Regex" : "--", "ConvertFunction" : "void" },
		{ "Name" : "Cast", "Regex" : "cast" "ConvertFunction" : "void" },
		{ "Name" : "Star", "Regex" : "*" "ConvertFunction" : "void" },
		{ "Name" : "Div", "Regex" : "/" "ConvertFunction" : "void" },
		{ "Name" : "Modulo", "Regex" : "%" "ConvertFunction" : "void" }
	],
	"Rules" : [
		{ "Name" : "Start", "Expression" : [
			{ "Rule" : "Expression(start)", "Id" : "Start" }
			]
		},
		{ "Name" : "Expression", "Expression" : [
			{ "Rule" : "MulExpression(expr)" , "Id" : "Unary" }
			]
		},
		{ "Name" : "MulExpression", "Expression" : [
			{ "Rule" : "CastExpression(cast)" , "Id" : "Cast" },
			{ "Rule" : "CastExpression(cast) ; Star ; MulExpression(follow)" , "Id" : "Multi" },
			{ "Rule" : "CastExpression(cast) ; Div ; MulExpression(follow)" , "Id" : "Div" },
			{ "Rule" : "CastExpression(cast) ; Modulo ; MulExpression(follow)" , "Id" : "Modulo" },
			]
		},
		{ "Name" : "CastExpression", "Expression" : [
			{ "Rule" : " UnaryExpression(unaryFollow)" , "Id" : "Unary" },
			{ "Rule" : " Cast ; Lparen ;  Identifier(type) ; Rparen ; CastExpression(follow)" , "Id" : "Cast" },
			]
		},
		{ "Name" : "UnaryExpression", "Expression" : [
			{ "Rule" : "PostfixExpression(expr)" , "Id" : "Post" },
			{ "Rule" : "Plusplus ; UnaryExpression(follow)" , "Id" : "IncUnary" },
			{ "Rule" : "Minusminus ; UnaryExpression(follow)" , "Id" : "DecUnary" }
			]
		},
		{ "Name" : "PostfixExpression", "Expression" : [
			{ "Rule" : "PrimaryExpression(primaryExpr)", "Id" : "Ident" },
			{ "Rule" : "PrimaryExpression(primaryExpr) ; PostfixNextExpression(follow)", 
				"Id" : "IdentPostfixNext" },
			]
		},
		{ "Name" : "PostfixNextExpression", "Expression" : [
			{ "Rule" : "Dot ; PostfixNextExpression(followPost)", "Id" : "DotPostfixNext" },
			{ "Rule" : "Dot ; PrimaryExpression(followPrimary)", "Id" : "DotPrimary" },
			{ "Rule" : "Dot ; PrimaryExpression(followPrimary) ; PostfixNextExpression(followPost)", 
				"Id" : "DotPrimaryPostfixNext" 
			},
			{ "Rule" : "Lparen ; Rparen", "Id" : "Call" },
			{ "Rule" : "Lparen ; Rparen ; PostfixNextExpression(followPost)", "Id" : "CallPostFixNext" },
			{ "Rule" : "Lbrack ; Expression(expr) ; Rbrack", "Id" : "ArrayExpr" },
			{ "Rule" : "Lbrack ; Expression(expr) ; Rbrack ; PostfixNextExpression(followPost)", 
				"Id" : "ArrayExprPostfixNext" }
			]
		},
		{ "Name" : "PrimaryExpression", "Expression" : [
			{ "Rule" : "Identifier(identifier)", "Id" : "PrimaryExpressionIdentifier" },
			{ "Rule" : "Lparen ; Expression(expr) ; Rparen", "Id" : "PrimaryExpressionExpression" }
			]
		}
	]
}