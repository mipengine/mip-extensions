/**
 * @file mip-access-expr
 * @author wupeng10@baidu.com
 */
define(function (require) {
    var parser = require('./mip-access-expr-impl');

	/**
	 * Evaluates access expression.
	 *
	 * @param {string} expr expression
	 * @param {!JSONType} data json data
	 * @return {boolean}
	 */
    function evaluateAccessExpr(expr, data) {
        try {
            parser.yy = data;
            return !!parser.parse(expr);
        }
        finally {
            parser.yy = null;
        }
    }

    return evaluateAccessExpr;
});
