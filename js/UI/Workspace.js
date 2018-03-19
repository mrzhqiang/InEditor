/**
* @author suheeeee<lalune1120@hotmail.com>
*/

define([], function() {
  'use strict';

  /**
   * @class Workspace
   */
  function Workspace() {

    this.init();

  }

  /**
  * @memberof Workspace
  */
  Workspace.prototype.init = function(){

    // init
      var config = {
        content: [{
          type: 'stack'
        }]
      };

    this.workspaceLayout = new GoldenLayout(config, $('#workspace-layout-container'));

    this.workspaceLayout.registerComponent('workspace', function(container, state) {
      // container.getElement().html(viewport);
    });

    this.workspaceLayout.init();

    $(window).resize(function() {
      window.uiContainer.resize();

    });


  }

  /**
  * @memberof Workspace
  */
  Workspace.prototype.addNewWorkspace = function(_id, _name) {

    var newItemConfig = {
      title: _name,
      type: 'component',
      componentName: 'workspace'
    };

    var contentItems = window.uiContainer.workspace.workspaceLayout.root.contentItems[0];
    contentItems.addChild(newItemConfig);

    var index = contentItems.contentItems.length - 1;
    contentItems.contentItems[index].element[0].id = _id;

    var viewport = "<div class=\"Panel\" id=\"viewport\" style=\"position:absoulte;\"><div id=" + _id + " class=\"container\"></div></div>";
    contentItems.contentItems[index].element[0].innerHTML = viewport;


    $(window).resize(function() {
      window.uiContainer.resize();
    });

  }

  /**
  * @memberof Workspace
  * @param {String} id floor id
  */
  Workspace.prototype.activateWorkspace = function(id){

    var tabs = window.uiContainer.workspace.workspaceLayout.root.contentItems[0].header.tabs;

    var index = 0;
    while( tabs[index].contentItem.config.title != id){

      index++;

    }
    window.uiContainer.workspace.workspaceLayout.root.contentItems[0].setActiveContentItem(window.uiContainer.workspace.workspaceLayout.root.contentItems[0].contentItems[index]);
    window.uiContainer.workspace.workspaceLayout.root.contentItems[0].header.setActiveContentItem(tabs[index].contentItem);

  }

  /**
  * @memberof Workspace
  */
  Workspace.prototype.clear = function(condition){

    var childerens = window.uiContainer.workspace.workspaceLayout.root.contentItems[0].contentItems;
    var len = childerens.length;

    if(condition != null && condition == 'maketmp'){
      window.uiContainer.workspace.workspaceLayout.root.contentItems[0].addChild({
        title: 'tmp',
        type: 'component',
        componentName: 'workspace'
      });
    }

    for(var i = 0 ; i < len; i++){
      window.uiContainer.workspace.workspaceLayout.root.contentItems[0].removeChild(childerens[0], false);
    }

  }

  Workspace.prototype.deleteFirstWorkspace = function(){

    var childerens = window.uiContainer.workspace.workspaceLayout.root.contentItems[0].contentItems;
    window.uiContainer.workspace.workspaceLayout.root.contentItems[0].removeChild(childerens[0], false);

  }



  return Workspace;

});
