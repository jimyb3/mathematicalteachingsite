/* JCE Editor - 2.4.3 | 11 September 2014 | http://www.joomlacontenteditor.net | Copyright (C) 2006 - 2014 Ryan Demmer. All rights reserved | GNU/GPL Version 2 or later - http://www.gnu.org/licenses/gpl-2.0.html */
(function(){var each=tinymce.each;tinymce.create('tinymce.plugins.Source',{init:function(ed,url){var self=this;this.editor=ed;this.url=url;ed.addCommand('mceSource',function(){self.toggleSource();});this.invisibles=false;if(ed.onContextMenu){var cMenu=ed.onContextMenu.addToTop(function(ed,e){if(ed.plugins.source.state){return false;}});}
ed.onInit.add(function(){var s=ed.getParam('source_state',false);if(typeof s!='undefined'){ed.settings.source_state=!s;self.toggleSource();}
if(ed.onFullScreen){ed.onFullScreen.add(function(editor,state){if(!state){ed.settings.source_state=!editor.settings.source_state;each(['source_highlight','source_numbers','source_wrap'],function(s){ed.settings[s]=editor.settings[s];});self.toggleSource();}});}});ed.onBeforeExecCommand.add(function(ed,cmd,ui,val,o){var cm=ed.controlManager,se=self.getEditor();if(self.state&&se){switch(cmd){case'Undo':o.terminate=true;se.undo();cm.setDisabled('redo',false);return true;break;case'Redo':o.terminate=true;se.redo();cm.setDisabled('redo',true);return true;break;case'mcePrint':o.terminate=true;return self.printSource();break;case'mceFullScreen':if(self.getState()){ed.setContent(self.getContent());}
break;}}});ed.onLoadContent.add(function(ed,o){if(self.getState()){self._disable();self.setContent();}});ed.onSetContent.add(function(ed,o){if(self.getState()){self.setContent();self._disable();}});ed.onSaveContent.add(function(ed,o){if(self.getState()){o.content=self.getContent();}});ed.onExecCommand.add(function(ed,cmd,ui,v,o){switch(cmd){case'mceCodeEditor':case'mceSource':self._disable();break;case'mceFullScreen':break;case'mceInsertContent':if(self.getState()){o.terminate=true;self._disable();self.insertContent(v);}
break;}});ed.addButton('source',{title:'source.desc',cmd:'mceSource'});ed.onNodeChange.add(function(ed,cm,n){var s=self.getState();if(s){self._disable();}});ed.theme.onResize.add(function(){self.resize();});},_disable:function(){var self=this;window.setTimeout(function(){self.toggleDisabled();},0);},getWin:function(){var ed=this.editor,f=tinymce.DOM.get('wf_'+ed.id+'_source_iframe');if(f){return f.contentWindow;}
return false;},getDoc:function(){var w=this.getWin();if(w){return w.document;}
return false;},getContainer:function(){var se=this.getEditor();if(se){return se.getContainer();}
return null;},getEditor:function(){var win=this.getWin();if(win){return win.SourceEditor||null;}
return null;},getState:function(){return this.editor.getParam('source_state',false);;},setState:function(s){this.state=s;},getTop:function(){var ed=this.editor,container=ed.getContentAreaContainer();return container.offsetTop+1;},printSource:function(){},reInit:function(){this.toggleDisabled(),se=this.getEditor();if(this.getState()&&se){se.focus();}},setContent:function(v){var ed=this.editor,se=this.getEditor();if(typeof v=='undefined'){v=ed.getContent();}
if(se){se.setContent(v,ed.getParam('source_format',true));}},insertContent:function(v){var DOM=tinymce.DOM,se=this.getEditor();if(se){se.insertContent(DOM.decode(v));}},getContent:function(){var se=this.getEditor();if(se){return se.getContent();}},resize:function(w,h,init){if(!this.state)
return;var ed=this.editor,DOM=tinymce.DOM,ifr=DOM.get(ed.id+'_ifr'),se=this.getEditor();w=parseFloat(w)||ifr.clientWidth;h=parseFloat(h)||ifr.clientHeight;if(se){DOM.setStyles('wf_'+ed.id+'_source_iframe',{'width':w,'height':h});DOM.setStyles(this.getContainer(),{'width':w,'height':h});se.resize(w,h,init);}},toggleDisabled:function(){var ed=this.editor,DOM=tinymce.DOM,cm=ed.controlManager;var state=this.getState();var active=DOM.select('.mceButtonActive',DOM.get(ed.id+'_toolbargroup'));each(active,function(n){cm.setActive(n.id,!state);});each(DOM.select('.mceButton, .mceListBox, .mceSplitButton',DOM.get(ed.id+'_toolbargroup')),function(n){var id=n.id;if(n.className.indexOf('mceSplitButton')!==-1){id=n.parentNode.id;}
if(id){cm.setDisabled(id,state);}});cm.setActive('source',state);cm.setActive('fullscreen',(ed.id=='mce_fullscreen'));cm.setDisabled('source',false);cm.setDisabled('fullscreen',false);},toggleSource:function(){var self=this,ed=this.editor,DOM=tinymce.DOM,cm=ed.controlManager;var se=this.getEditor();var state=this.getState();var iframe=DOM.get(ed.id+'_ifr');this.setState(!state);if(tinymce.isIE){DOM.setStyle(iframe.parentNode,'position','relative');}
var editorpath=DOM.get(ed.id+'_path_row');var wordcount=DOM.get(ed.id+'-word-count');if(!state){if(editorpath){DOM.hide(editorpath);}
if(wordcount){DOM.hide(wordcount.parentNode);}
DOM.setStyle(iframe,'visiblity','hidden');DOM.setAttrib(iframe,'aria-hidden',true);window.setTimeout(function(){self.setHighlight(ed.getParam('source_highlight',true));if(se){se.focus();}},10);}else{if(se){ed.setContent(self.getContent());DOM.hide('wf_'+ed.id+'_source_container');DOM.setAttrib('wf_'+ed.id+'_source_container','aria-hidden',true);}
DOM.setStyle(iframe,'visiblity','visible');iframe.removeAttribute('aria-hidden');if(editorpath){DOM.show(editorpath);}
if(wordcount){DOM.show(wordcount.parentNode);}
ed.setProgressState(false);}
ed.settings.source_state=!state;},loadEditor:function(){var self=this,ed=this.editor,k,cm=ed.controlManager,DOM=tinymce.DOM,iframe=DOM.get(ed.id+'_ifr');var w=iframe.clientWidth,h=iframe.clientHeight;var container=DOM.create('div',{role:'textbox',style:{position:'absolute',top:tinymce.isIE?0:this.getTop()},id:'wf_'+ed.id+'_source_container','class':'WFSourceEditor'});DOM.insertAfter(container,iframe);var query=ed.getParam('site_url')+'index.php?option=com_jce';var args={'view':'editor','layout':'plugin','plugin':'source','component_id':ed.getParam('component_id')};args[ed.settings.token]=1;for(k in args){query+='&'+k+'='+encodeURIComponent(args[k]);}
var iframe=DOM.create('iframe',{'frameborder':0,'scrolling':'no','id':'wf_'+ed.id+'_source_iframe','src':query,'style':{'width':w,'height':h}});tinymce.dom.Event.add(iframe,'load',function(){var editor=self.getEditor();var content=ed.getContent(),highlight=ed.getParam('source_highlight',true),wrap=ed.getParam('source_wrap',true),numbers=ed.getParam('source_numbers',true);editor.init({'wrap':wrap,'linenumbers':numbers,'highlight':highlight,'width':w,'height':h,'theme':ed.getParam('source_theme','textmate'),'format':ed.getParam('source_format',true),'tag_closing':ed.getParam('source_tag_closing',true),'selection_match':ed.getParam('source_selection_match',true),'font_size':ed.getParam('source_font_size',''),'load':function(){ed.setProgressState(false);if(tinymce.isIE&&!document.querySelector){ed.hide();ed.show();}},change:function(){ed.controlManager.setDisabled('undo',false);}},content);self.resize();});DOM.add(container,iframe);},setHighlight:function(s){var ed=this.editor,DOM=tinymce.DOM,se=this.getEditor();if(se){se.highlight(s);this.setContent();se.format();DOM.show('wf_'+ed.id+'_source_container');DOM.setAttrib('wf_'+ed.id+'_source_container','aria-hidden',false);DOM.setStyle('wf_'+ed.id+'_source_container','top',tinymce.isIE?0:this.getTop());this.resize();this.setNumbers(ed.getParam('source_numbers',true));this.setWrap(ed.getParam('source_wrap',true));ed.focus();ed.setProgressState(false);}else{ed.setProgressState(true);this.loadEditor();}
ed.settings.source_highlight=!!s;},setWrap:function(s){var ed=this.editor,se=this.getEditor();ed.settings.source_wrap=!!s;if(se){se.wrap(s);}},setNumbers:function(s){var ed=this.editor,se=this.getEditor();ed.settings.source_numbers=!!s;if(se){return se.linenumbers(!!s);}},getInfo:function(){return{longname:'Source',author:'Ryan Demmer',authorurl:'http://www.joomlacontenteditor.net',infourl:'http://www.joomlacontenteditor.net',version:'2.4.3'};}});tinymce.PluginManager.add('source',tinymce.plugins.Source);})();