/**
 * A super simple checklist
 * @version v0.0.0
 * @author icompuiz <isioma.nnodum@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

(function() {

	angular
		.module('ss-checklist', ['LocalStorageModule'])
		.config(ConfigBlock);

	ConfigBlock.$inject = ['ssChecklistProvider', 'localStorageServiceProvider'];
	function ConfigBlock(ssChecklistProvider, localStorageServiceProvider) {

	   localStorageServiceProvider
			.setStorageType('localStorage');
	}

})();

(function() {

	angular
		.module('ss-checklist')
		.provider('ssChecklist', ssChecklistProvider);

		ssChecklistProvider.$inject = ['localStorageServiceProvider'];

		function ssChecklistProvider(localStorageServiceProvider) {

			var localStoragePrefix = 'ss-checklist';
		  	localStorageServiceProvider.setPrefix(localStoragePrefix);

			this.setLocalStoragePrefix = setLocalStoragePrefix;
			this.getLocalStoragePrefix = getLocalStoragePrefix;

			ssChecklistService.$inject = [];
			this.$get = ssChecklistService;

			return;

			function setLocalStoragePrefix(prefix) {
				localStoragePrefix = prefix || localStoragePrefix;
			  localStorageServiceProvider.setPrefix(prefix);
			}
			function getLocalStoragePrefix() {
				return localStoragePrefix;
			}


			function ssChecklistService() {

				return {
					localStoragePrefix: localStoragePrefix
				};

			}
		}



})();

(function() {

	angular
		.module('ss-checklist')
		.directive('ssTask', ssTaskDirective);

	ssTaskDirective.$inject = ['$compile'];

	function ssTaskDirective($compile) {

		var directive = {
		 	priority: 0,
			scope: {
				key: '=ssTask'
			},
			controller: 'SyncableController as ctrl',
			link: link
		};
		return directive;
		
		function link(scope, element, attr, ctrl) {


			var checkbox = element.find('[type=checkbox]');
			ctrl.load(scope.key || element.text().trim());

			checkbox.attr('ng-model', 'ctrl.val');
			checkbox.attr('ng-change', 'ctrl.sync()');
			element.attr('ng-class', '{ completed: ctrl.val }');

			element.removeAttr('ss-task');

			$compile(element)(scope);


		}
	}

})();

(function() {

	angular
		.module('ss-checklist')
		.directive('ssNotes', ssNotesDirective);


	ssNotesDirective.$inject = ['$compile'];
	function ssNotesDirective($compile) {

		var directive = {
		 	priority: 1,
			restrict: 'A',
			scope: {},
			controller: 'SyncableController as ssNotesCtrl',
			link: link
		};
		return directive;
		
		function link(scope, element, attr) {

			var ssTaskScope = element.prev().scope();

			if (ssTaskScope) 
			{
				var ctrl = ssTaskScope.ctrl;
				var key = ctrl.key + '.notes';
				
				scope.notesVisible = scope.ssNotesCtrl.get(key + '.visible') || false;

				scope.ssNotesCtrl.load(key);

				element.attr('ng-show', 'notesVisible')
				element.attr('ng-model', 'ssNotesCtrl.val')
				element.attr('ng-change', 'ssNotesCtrl.sync()');
				element.attr('placeholder', 'Enter notes for this task');

				element.removeAttr('ss-notes');

				var hidLnk = $('<br /><a href="#" ng-click="notesVisible = !notesVisible" class="text-muted supersmall"><small>{{ notesVisible ? "hide" : "show" }} notes</small></a>');

				// element.prev().append("");
				element.prev().append(hidLnk);

				$compile(element)(scope);
				$compile(hidLnk)(scope);

				scope.$watch('notesVisible', function(current, prev) {
					if (prev !== undefined) {
						scope.ssNotesCtrl.set(key + '.visible', current);
					}
				})

			}

		}
	}

})();

(function() {

	angular
		.module('ss-checklist')
		.controller('SyncableController', SyncableController);


	SyncableController.$inject = ['localStorageService'];
	function SyncableController(localStorageService) {
		
		this.key = null
		this.val = null;

		this.set = set;
		this.get = get;
		this.sync = sync;
		this.load = load;
		this.toggleNotes = toggleNotes;


		function sync() {
			set(this.key, this.val)
		}

		function set(key, value) {
			return localStorageService.set(key, value);
		}

		function get(key) {
		 	return localStorageService.get(key);
		}

		function load(key) {
			this.key = key;
			this.val = get(key);
		}

		function toggleNotes() {
			this.showNotes = !this.showNotes
		}

	}

	
})();