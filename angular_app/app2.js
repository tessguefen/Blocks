(function( window, angular, undefined ) {

	var ngModule = angular.module('Components', [
		'ui.tree'
	]);

	ngModule.factory('ComponentsAPI', [ '$http', function( $http ) {
			var self = this;

			self.getData = function( layout_id, callback ) {
				return AJAX_Call_Module( callback,
								'admin',
								'TGCOMPONENTS',
								'Layout_Load_Components',
								'Layout_ID=' + layout_id );
			}

			self.getComponents = function( callback ) {
				return AJAX_Call_Module( callback,
								'admin',
								'TGCOMPONENTS',
								'Components_Load_All' );
			}

			self.saveLayout = function( layout_id, callback, data ) {
				return AJAX_Call_Module_FieldList( callback,
									   'admin',
									   'TGCOMPONENTS',
									   'Layout_Save',
									   'Layout_ID=' + layout_id + '&Payload=' + data,
									   '' );
			}

			return self;
		}
	]);

	// Controller
	ngModule.controller('ComponentsController', ['$scope', '$window', '$document', '$timeout', 'ComponentsAPI', function( $scope, $window, $document, $timeout, ComponentsAPI ) {
		// Load in Components
		$scope.components = {};
		ComponentsAPI.getComponents( function( data ) {
			initComponents( data );
		});

		// Determine Permissions
		$scope.permissions = {};
		$scope.permissions.can_add = CanI( 'TGCOMPONENTS', 0, 1, 0, 0 );
		$scope.permissions.can_edit = CanI( 'TGCOMPONENTS', 0, 0, 1, 0 );
		$scope.permissions.can_delete = CanI( 'TGCOMPONENTS', 0, 0, 0, 1 );

		$scope.mmdialog = {};
		$scope.mmdialog.component = {};

		$scope.nodeActive = 0;

		// Initialize Layout.
		$scope.initializeLayout = function( layout ) {

			$scope.data = {};
			$scope.data.layout = layout;

			$scope.data.layout_id = layout.id;

			$scope.data.itemsForDeletion = {};
			$scope.data.itemsForDeletion.nodes = [];

			ComponentsAPI.getData( layout.id, function( data ) {
				init( data );
			});
		}

		$scope.toggleNodeActions = function( node ) {
			$scope.nodeActive = node ? node : null;
		}

		$scope.resetDialog = function() {
			$scope.mmdialog = {};
			$scope.mmdialog.component = {};
		}
		$scope.openMMDialog = function( type, parent ) {
			$scope.resetDialog();

			$scope.mmdialog.type = type;
			$scope.mmdialog.title = type == 'add' ? 'Add New Component' : 'Edit Component';
			$scope.mmdialog.component.parent = parent;

			$scope.mmdialog.popup = new LayoutPopup( type );
			$scope.mmdialog.popup.Show();
		}
		$scope.closeMMDialog = function() {
			$scope.resetDialog();
			$scope.mmdialog.popup.Hide();
		}

		$scope.insertNewComponent = function() {
			$scope.mmdialog.show_errors = 0;
			$scope.$digest();
			if ( !$scope.mmdialog.dialogForm.$invalid) {
				$scope.$apply(function() {
					if ( $scope.mmdialog.component.parent.nodes.length === 0 ) $scope.mmdialog.component.parent.nodes = [];
					if ( $scope.mmdialog.component.component.allow_children == 1 ) $scope.mmdialog.component.nodes = [];
					$scope.mmdialog.component.parent.nodes.push( angular.copy( $scope.mmdialog.component ) );
					$scope.closePopup();
				});
			} else {
				$scope.$apply(function() {
					$scope.mmdialog.show_errors = 1;
				
				});
			}
	
		}

		/* Master MM Dialog */
		function LayoutPopup( type ) {
			var self = this;

			MMDialog.call( this, 'layoutcomponent', 680, 450 );

			self.SetResizeEnabled();

			if ( type == 'add' ) {
				this.button_add									= null;
				this.button_save								= this.ActionItem_Add( 'Add', function() { $scope.insertNewComponent(); } );
				this.button_delete								= null;
				this.button_cancel 								= this.ActionItem_Add( 'Cancel', function() { self.Hide(); } );	
			}
		}
		DeriveFrom( MMDialog, LayoutPopup );

		LayoutPopup.prototype.onEnter = function(){
			this.Save();
		}







		///***** no changes ****///

		/* Dialog Functions */
		function LayoutComponentPopup_add() {
			var self = this;
			MMDialog.call( this, 'layoutcomponent_add', 680, 450 );

			self.SetResizeEnabled();
			
			// Buttons
			this.button_add									= null;
			this.button_save								= this.ActionItem_Add( 'Add', function() { $scope.insertComponent(); } );
			this.button_delete								= null;
			this.button_cancel 								= this.ActionItem_Add( 'Cancel', function() { self.Hide(); } );	
		}
		DeriveFrom( MMDialog, LayoutComponentPopup_add );

		LayoutComponentPopup_add.prototype.onEnter = function(){
			this.Save();
		}

		function layoutComponentPopup_EDIT( scope, node ) {
			var self = this;
			MMDialog.call( this, 'layoutcomponent_edit', 680, 450 );

			self.SetResizeEnabled();
			
			// Buttons
			this.button_add									= null;
			this.button_save								= this.ActionItem_Add( 'Save', function() { $scope.updateComponent( scope, node ); } );
			this.button_delete								= null;
			this.button_cancel 								= this.ActionItem_Add( 'Cancel', function() { $scope.cancelEdit( scope, node ) } );
		}
		DeriveFrom( MMDialog, layoutComponentPopup_EDIT );

		layoutComponentPopup_EDIT.prototype.onEnter = function(){
			this.Save();
		}

		var init = function( cmps ) {
			$timeout( function(){
				$scope.data.layout.nodes = cmps;
			}, 0);
		}

		var initComponents = function( cmps ) {
			$timeout( function(){
				$scope.components = cmps;
			}, 0);
		}

		$scope.removeComponent = function( scope, node ) {
			if( $window.confirm('Are you sure you want to delete this?') ) {
				$scope.data.itemsForDeletion.nodes.push( node );
				scope.remove();
			}
		};

		$scope.checkNodes = function( node ) {
			if ( ( typeof node.component != 'undefined' ) && ( node.component.allow_children == 1 ) ) {
				if ( node.nodes.length === 0 ) {
					node.nodes = [];
				}
			}
		}

		$scope.slideToggle = function( node ) {
			node.hide_nodes = !node.hide_nodes;
		}


		$scope.newComponent = function( scope ) {
			var nodeData = scope.$modelValue;
			if( !nodeData ) {
				nodeData = $scope.data.layout;
			}
			$scope.openMMDialog( 'add', nodeData );
		}

		$scope.removeIdAndParentId = function( node ) {
			node.id = 0;
			node.parent = 0;
			angular.forEach( node.nodes, function(child) {
				$scope.removeIdAndParentId( child );
			});
		}

		$scope.duplicateComponent = function( parent, node ) {
			if( $window.confirm('Are you sure you want to duplicate this?') ) {
				var nodeCopy = angular.copy( node );
				$scope.removeIdAndParentId( nodeCopy );
				nodeCopy.name = nodeCopy.name + ' - Copy';

				if ( parent.nodes.length === 0 ) parent.nodes = [];
				parent.nodes.push( nodeCopy );
				$scope.toggleNodeActions();
			}
		}

		$scope.newComponent_Validation = function( attribute, index ) {
			if ( !$scope.data.popup_show_errors ) return false;
			if ( attribute.type == 'link' && ( attribute.link.type != 'N') && ( !attribute.link.value ) ) return true;
			if ( !attribute.required ) return false;
			if ( attribute.type != 'link' && $scope.newComponentForm['layoutcomponent_' + index].$invalid ) return true;
		}

		$scope.insertComponent = function() {
			$scope.data.popup_show_errors = 0;
			$scope.$digest();
			if ( !$scope.newComponentForm.$invalid) {
				$scope.$apply(function() {
					if ( $scope.data.newComponent.parent.nodes.length === 0 ) $scope.data.newComponent.parent.nodes = [];
					if ( $scope.data.newComponent.component.allow_children == 1 ) $scope.data.newComponent.nodes = [];
					$scope.data.newComponent.parent.nodes.push( angular.copy( $scope.data.newComponent ) );
					$scope.closePopup();
				});
			} else {
				$timeout( function(){
					$scope.data.popup_show_errors = 1;
				}, 0);
			}
	
		}

		$scope.closePopup = function() {
			$scope.resetPopup();
			$scope.popup.Hide();
		}

		$scope.openPopup = function( parent ) {
			$scope.resetPopup();
			$scope.data.newComponent.parent = parent;
			$scope.data.newComponent.active = 1;
			$scope.popup = new LayoutComponentPopup_add();
			$scope.popup.Show();
		}

		$scope.resetPopup = function() {
			$scope.data.newComponent = new Object();
			$scope.data.newComponent.component = new Object();
			$scope.data.newComponent.parent = new Object();
			$scope.data.components = angular.copy( $scope.data.original_components );
			$scope.data.popup_show_errors = 0;
			if ( typeof $scope.popup == 'object' ) $scope.popup.Hide();
		}

		/*** Submission of SAVE ***/
		$scope.saveLayout = function( button ) {
			var layout_data = new Object();
			layout_data.layout = angular.copy( $scope.data.layout );

			layout_data.deleted = angular.copy( $scope.data.itemsForDeletion );

			DisableButtons( button );
			DisableOnSubmitFormElements();
			
			ComponentsAPI.saveLayout( layout_data.layout.id, function( data ) {
				$scope.data.itemsForDeletion = new Object();
				$scope.data.itemsForDeletion.nodes = [];
				document.getElementById( 'jsLayoutUpdated' ).value = 1;
				document.forms[ Screen ].submit();
			}, encodeURIComponent( JSON.stringify( layout_data ) ) );
		}

		/*** EDIT ***/
		$scope.editComponent = function( scope, node ) {
			angular.copy( node, $scope.data.editComponent );
			$scope.popup = new layoutComponentPopup_EDIT( scope, node );
			$scope.popup.Show();
		}

		$scope.editComponent_Validation = function( attribute, index ) {
			if ( !$scope.data.popup_show_errors ) return false;
			if ( attribute.type == 'link' && ( attribute.link.type != 'N') && ( !attribute.link.value ) ) return true;
			if ( !attribute.required ) return false;
			if ( attribute.type != 'link' && $scope.editComponentForm['layoutcomponent_' + index].$invalid ) return true;
		}

		$scope.updateComponent = function( scope, node ) {
			$scope.data.popup_show_errors = 0;
			$scope.$digest();
			if ( !$scope.editComponentForm.$invalid) {
				$scope.$apply(function() {
					node.name = $scope.data.editComponent.name;
					node.active = $scope.data.editComponent.active ? 1 : 0;
					node.component = $scope.data.editComponent.component;
					$scope.data.editComponent = new Object();
					$scope.closePopup();
				});
			} else {
				$timeout( function(){
					$scope.data.popup_show_errors = 1;
				}, 0);
			}
		}

		$scope.cancelEdit = function( scope, node ) {
			$timeout( function(){
				$scope.data.editComponent = new Object();
				$scope.closePopup();
			}, 0);
		}


		/*** Popups for Forms ***/
		$scope.linkPopup = function( attribute ) {
			var id = 'js-attribute_link_' + attribute.id;
			if ( attribute.link.type == 'P' ) {
				$scope.productPopup( id );
			} else if( attribute.link.type == 'C' ) {
				$scope.categoryPopup( id );
			} else if ( attribute.link.type == 'G' ) {
				$scope.pagePopup( id );
			}
		}

		$scope.productPopup = function( field ) {
			product_dialog = new ProductLookup_Dialog();
			product_dialog.onok = function(){
				var record;

				if ( ( record = product_dialog.SelectedProduct() ) === null ){
					return;
				}

				$scope.$apply(function() {
					var field_div = document.getElementById( field );
					var element = angular.element(field_div);
					element.val( record.code );
					element.triggerHandler('input');
				});
			};

			product_dialog.Show();
		}

		$scope.categoryPopup = function( field ) {
			category_dialog = new CategoryLookup_Dialog();
			category_dialog.onok = function(){
				var record;

				if ( ( record = category_dialog.SelectedCategory() ) === null ){
					return;
				}

				$scope.$apply(function() {
					var field_div = document.getElementById( field );
					var element = angular.element(field_div);
					element.val( record.code );
					element.triggerHandler('input');
				});
			};

			category_dialog.Show();
		}

		$scope.pagePopup = function( field ) {
			var page_dialog = new PageLookup_Dialog();
			page_dialog.onok		= function(){
				var record;

				if ( ( record = page_dialog.SelectedPage() ) === null ) {
					return;
				}

				$scope.$apply(function() {
					var field_div = document.getElementById( field );
					var element = angular.element(field_div);
					element.val( record.code );
					element.triggerHandler('input');
				});
			};
			page_dialog.Show();
		}

		$scope.imageUpload = function( field ) {
			var image_dialog = new MMImagePicker( true, true );
			image_dialog.onComplete	= function( images ) {
				$scope.$apply(function() {
					var field_div = document.getElementById( field );
					var element = angular.element(field_div);
					element.val( images[ 0 ] ? images[ 0 ].image : '' );
					element.triggerHandler('input');
				});
			};
			image_dialog.Show();
		}

		$scope.dateTimePopup = function( attr, field ) {
			var dateTimePicker;
			if ( attr.value ) {
				var nDate = attr.value * 1000;
				dateTimePicker = new MMDateTimePicker( new Date( nDate ) );
			} else {
				dateTimePicker = new MMDateTimePicker( new Date() );
			}
			dateTimePicker.oncomplete = function( date ) {
				$scope.$apply(function() {
					attr.value = date.getTime() / 1000;
				});
			};
			dateTimePicker.Show();
		}

		$scope.dateTimeFormatted = function( date ) {
			date = date * 1000;
			var d = new Date( date );
			return d.toLocaleString();
		}

		$scope.removeDateTime = function( attr ) {
			attr.value = '';
		}
	}]);

})( window, window.angular );

function initializeLayout( layout ) {
	var scope = angular.element(document.getElementById('ComponentsController_ID')).scope();
	scope.$apply(function () {
		scope.initializeLayout( layout );
	});
}