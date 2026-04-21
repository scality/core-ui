import tsParser from "@typescript-eslint/parser";
import modalButtonForbiddenLabel from "./rules/modal-button-forbidden-label.mjs";
import modalFooterRequired from "./rules/modal-footer-required.mjs";
import modalFooterStackAlignment from "./rules/modal-footer-stack-alignment.mjs";
import modalTitleString from "./rules/modal-title-string.mjs";
import modalAlertdialogNoClose from "./rules/modal-alertdialog-no-close.mjs";
import noRawNumberInJsx from "./rules/no-raw-number-in-jsx.mjs";
import technicalSentenceCase from "./rules/technical-sentence-case.mjs";

const rules = {
	"technical-sentence-case": technicalSentenceCase,
	"modal-button-forbidden-label": modalButtonForbiddenLabel,
	"modal-footer-required": modalFooterRequired,
	"modal-footer-stack-alignment": modalFooterStackAlignment,
	"modal-title-string": modalTitleString,
	"modal-alertdialog-no-close": modalAlertdialogNoClose,
	"no-raw-number-in-jsx": noRawNumberInJsx,
};

/** Default rule severity for the recommended config. */
const recommendedRules = {
	"valalint/technical-sentence-case": "warn",
	"valalint/modal-button-forbidden-label": "warn",
	"valalint/modal-footer-required": "warn",
	"valalint/modal-footer-stack-alignment": "warn",
	"valalint/modal-title-string": "warn",
	"valalint/modal-alertdialog-no-close": "warn",
	"valalint/no-raw-number-in-jsx": "warn",
};

const plugin = {
	meta: {
		name: "valalint",
		version: "1.0.0",
	},

	rules,
	configs: {
		/** Legacy eslintrc-style recommended config. */
		recommended: {
			plugins: ["valalint"],
			rules: recommendedRules,
		},
	},
};

plugin.configs["flat/recommended"] = {
	plugins: { valalint: plugin },
	rules: recommendedRules,
	languageOptions: {
		parser: tsParser,
		parserOptions: {
			ecmaFeatures: {
				jsx: true,
			},
			project: true,
		},
	},
};

export default plugin;
