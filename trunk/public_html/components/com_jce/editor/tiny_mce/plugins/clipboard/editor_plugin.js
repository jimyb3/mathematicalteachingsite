/* JCE Editor - 2.3.4.4 | 12 December 2013 | http://www.joomlacontenteditor.net | Copyright (C) 2006 - 2013 Ryan Demmer. All rights reserved | GNU/GPL Version 2 or later - http://www.gnu.org/licenses/gpl-2.0.html */
(function(){var each=tinymce.each,VK=tinymce.VK,Event=tinymce.dom.Event;var styleProps=new Array('background','background-attachment','background-color','background-image','background-position','background-repeat','border','border-bottom','border-bottom-color','border-bottom-style','border-bottom-width','border-color','border-left','border-left-color','border-left-style','border-left-width','border-right','border-right-color','border-right-style','border-right-width','border-style','border-top','border-top-color','border-top-style','border-top-width','border-width','outline','outline-color','outline-style','outline-width','height','max-height','max-width','min-height','min-width','width','font','font-family','font-size','font-style','font-variant','font-weight','content','counter-increment','counter-reset','quotes','list-style','list-style-image','list-style-position','list-style-type','margin','margin-bottom','margin-left','margin-right','margin-top','padding','padding-bottom','padding-left','padding-right','padding-top','bottom','clear','clip','cursor','display','float','left','overflow','position','right','top','visibility','z-index','orphans','page-break-after','page-break-before','page-break-inside','widows','border-collapse','border-spacing','caption-side','empty-cells','table-layout','color','direction','letter-spacing','line-height','text-align','text-decoration','text-indent','text-shadow','text-transform','unicode-bidi','vertical-align','white-space','word-spacing');tinymce.create('tinymce.plugins.ClipboardPlugin',{init:function(ed,url){var self=this,cb;self.editor=ed;self.url=url;this.canPaste=false;self.onPreProcess=new tinymce.util.Dispatcher(this);self.onPostProcess=new tinymce.util.Dispatcher(this);self.onAfterPaste=new tinymce.util.Dispatcher(this);self.onPreProcess.add(self._preProcess);self.onPostProcess.add(self._postProcess);self.onPreProcess.add(function(pl,o){ed.execCallback('paste_preprocess',pl,o);});self.onPostProcess.add(function(pl,o){ed.execCallback('paste_postprocess',pl,o);});ed.onKeyDown.addToTop(function(ed,e){if((VK.metaKeyPressed&&e.keyCode==86)||(e.shiftKey&&e.keyCode==45)){return false;}
if(!ed.getParam('clipboard_allow_cut',1)&&(VK.metaKeyPressed&&e.keyCode==88)){e.preventDefault();return false;}
if(!ed.getParam('clipboard_allow_copy',1)&&(VK.metaKeyPressed&&e.keyCode==67)){e.preventDefault();return false;}});self.pasteText=ed.getParam('clipboard_paste_text',1);self.pasteHtml=ed.getParam('clipboard_paste_html',1);function process(o){var dom=ed.dom,rng;ed.setProgressState(1);switch(self.command){case'mcePaste':if(!self.pasteHtml){self.command='mcePasteText';}
break;case'mcePasteText':if(!self.pasteText){self.command='mcePaste';}
break;case'mcePasteWord':if(!self.pasteWord||!self.pasteHtml){self.command='mcePasteText';}
break;default:self.command='mcePaste';if(!self.pasteHtml&&self.pasteText){self.command='mcePasteText';}
break;}
self.plainText=self.command=='mcePasteText';if(ed.getParam('clipboard_paste_force_cleanup')){o.wordContent=true;}
self.onPreProcess.dispatch(self,o);o.node=dom.create('div',0,o.content);if(tinymce.isGecko){rng=ed.selection.getRng(true);if(rng.startContainer==rng.endContainer&&rng.startContainer.nodeType==3){if(o.node.childNodes.length===1&&/^(p|h[1-6]|pre)$/i.test(o.node.firstChild.nodeName)&&o.content.indexOf('__MCE_ITEM__')===-1)
dom.remove(o.node.firstChild,true);}}
self.onPostProcess.dispatch(self,o);o.content=ed.serializer.serialize(o.node,{getInner:1,forced_root_block:''});if(self.plainText){self._insertPlainText(o.content);}else{self._insert(o.content);}
self.onAfterPaste.dispatch(self);ed.setProgressState(0);self.command='mcePaste';}
ed.addCommand('mceInsertClipboardContent',function(u,o){process(o);});ed.onInit.add(function(){if(ed.plugins.contextmenu){ed.plugins.contextmenu.onContextMenu.add(function(th,m,e){var c=ed.selection.isCollapsed();if(ed.getParam('clipboard_cut',1)){m.add({title:'advanced.cut_desc',icon:'cut',cmd:'Cut'}).setDisabled(c);}
if(ed.getParam('clipboard_copy',1)){m.add({title:'advanced.copy_desc',icon:'copy',cmd:'Copy'}).setDisabled(c);}
if(self.pasteHtml){m.add({title:'paste.paste_desc',icon:'paste',cmd:'mcePaste'});}
if(self.pasteText){m.add({title:'paste.paste_text_desc',icon:'pastetext',cmd:'mcePasteText'});}});}});function grabContent(e){var n,or,rng,oldRng,sel=ed.selection,dom=ed.dom,doc=ed.getDoc(),body=ed.getBody(),posY,textContent;if(e.clipboardData||doc.dataTransfer){textContent=(e.clipboardData||doc.dataTransfer).getData('Text');if(ed.pasteAsPlainText){e.preventDefault();process({content:textContent.replace(/\r?\n/g,'<br />')});return;}}
if(dom.get('_mcePaste')){return;}
n=dom.add(body,'div',{id:'_mcePaste','class':'mcePaste','data-mce-bogus':'1'},'\uFEFF\uFEFF');if(body!=ed.getDoc().body)
posY=dom.getPos(ed.selection.getStart(),body).y;else
posY=body.scrollTop+dom.getViewPort(ed.getWin()).y;dom.setStyles(n,{position:'absolute',left:tinymce.isGecko?-40:0,top:posY-25,width:1,height:1,overflow:'hidden'});if(tinymce.isIE){oldRng=sel.getRng();rng=dom.doc.body.createTextRange();rng.moveToElementText(n);rng.execCommand('Paste');dom.remove(n);if(n.innerHTML==='\uFEFF\uFEFF'){e.preventDefault();return;}
sel.setRng(oldRng);sel.setContent('');self.canPaste=true;setTimeout(function(){process({content:n.innerHTML});},0);tinymce.dom.Event.cancel(e);}else{function block(e){e.preventDefault();}
self.canPaste=true;dom.bind(doc,'mousedown',block);dom.bind(doc,'keydown',block);or=ed.selection.getRng();n=n.firstChild;rng=doc.createRange();rng.setStart(n,0);rng.setEnd(n,2);sel.setRng(rng);window.setTimeout(function(){var h='',nl;if(!dom.select('div.mcePaste > div.mcePaste').length){nl=dom.select('div.mcePaste');each(nl,function(n){var child=n.firstChild;if(child&&child.nodeName=='DIV'&&child.style.marginTop&&child.style.backgroundColor){dom.remove(child,1);}
each(dom.select('span.Apple-style-span',n),function(n){dom.remove(n,1);});each(dom.select('br[data-mce-bogus]',n),function(n){dom.remove(n);});if(n.parentNode.className!='mcePaste')
h+=n.innerHTML;});}else{h='<p>'+dom.encode(textContent).replace(/\r?\n\r?\n/g,'</p><p>').replace(/\r?\n/g,'<br />')+'</p>';}
each(dom.select('div.mcePaste'),function(n){dom.remove(n);});if(or)
sel.setRng(or);process({content:h});dom.unbind(ed.getDoc(),'mousedown',block);dom.unbind(ed.getDoc(),'keydown',block);},0);}}
if(tinymce.isOpera||/Firefox\/2/.test(navigator.userAgent)){ed.onKeyDown.addToTop(function(ed,e){if(((tinymce.isMac?e.metaKey:e.ctrlKey)&&e.keyCode==86)||(e.shiftKey&&e.keyCode==45))
grabContent(e);});}else{ed.onPaste.addToTop(function(ed,e){return grabContent(e);});}
if(ed.getParam('clipboard_paste_block_drop')){ed.onInit.add(function(){ed.dom.bind(ed.getBody(),['dragend','dragover','draggesture','dragdrop','drop','drag'],function(e){e.preventDefault();e.stopPropagation();return false;});});}
each(['Cut','Copy'],function(command){ed.addCommand(command,function(){var doc=ed.getDoc(),failed;try{doc.execCommand(command,false,null);}catch(ex){failed=true;}
var msg=ed.getLang('clipboard_msg','');msg=msg.replace(/\%s/g,tinymce.isMac?'CMD':'CTRL');if(failed||!doc.queryCommandSupported(command)){if(tinymce.isGecko){ed.windowManager.confirm(msg,function(state){if(state)
open('http://www.mozilla.org/editor/midasdemo/securityprefs.html','_blank');});}else
ed.windowManager.alert(ed.getLang('clipboard_no_support'));}});});each(['mcePasteText','mcePaste'],function(cmd){ed.addCommand(cmd,function(){var doc=ed.getDoc();self.command=cmd;if(ed.getParam('clipboard_paste_use_dialog')||(tinymce.isIE&&!doc.queryCommandSupported('Paste'))){return self._openWin(cmd);}else{try{doc.execCommand('Paste',false,null);}catch(e){self.canPaste=false;}
if(self.canPaste===false){return self._openWin(cmd);}}});});if(self.pasteHtml){ed.addButton('paste',{title:'paste.paste_desc',cmd:'mcePaste',ui:true});}
if(self.pasteText){ed.addButton('pastetext',{title:'paste.paste_text_desc',cmd:'mcePasteText',ui:true});}
if(ed.getParam('clipboard_cut',1)){ed.addButton('cut',{title:'advanced.cut_desc',cmd:'Cut',icon:'cut'});}
if(ed.getParam('clipboard_copy',1)){ed.addButton('copy',{title:'advanced.copy_desc',cmd:'Copy',icon:'copy'});}},getInfo:function(){return{longname:'Paste text/word',author:'Moxiecode Systems AB / Ryan demmer',authorurl:'http://tinymce.moxiecode.com',infourl:'http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/paste',version:'2.3.4.4'};},_openWin:function(cmd){var ed=this.editor;ed.windowManager.open({file:ed.getParam('site_url')+'index.php?option=com_jce&view=editor&layout=plugin&plugin=clipboard&cmd='+cmd,width:parseInt(ed.getParam("clipboard_paste_dialog_width","450")),height:parseInt(ed.getParam("clipboard_paste_dialog_height","400")),inline:1,popup_css:false},{cmd:cmd});},_preProcess:function(pl,o){var ed=pl.editor,h=o.content,rb;if(ed.settings.paste_enable_default_filters==false){return;}
if(tinymce.isIE&&document.documentMode>=9&&/<(h[1-6r]|p|div|address|pre|form|table|tbody|thead|tfoot|th|tr|td|li|ol|ul|caption|blockquote|center|dl|dt|dd|dir|fieldset)/.test(o.content)){h=h.replace(/(?:<br>&nbsp;[\s\r\n]+|<br>)*(<\/?(h[1-6r]|p|div|address|pre|form|table|tbody|thead|tfoot|th|tr|td|li|ol|ul|caption|blockquote|center|dl|dt|dd|dir|fieldset)[^>]*>)(?:<br>&nbsp;[\s\r\n]+|<br>)*/g,'$1');h=h.replace(/<br><br>/g,'<BR><BR>');h=h.replace(/<br>/g,' ');h=h.replace(/<BR><BR>/g,'<br>');}
h=h.replace(/^\s*(&nbsp;)+/g,'');h=h.replace(/(&nbsp;|<br[^>]*>)+\s*$/g,'');if(this.plainText){return h;}
var ooRe=/(Version:[\d\.]+)\s*?((Start|End)(HTML|Fragment):[\d]+\s*?){4}/;if(/(content=\"OpenOffice.org[^\"]+\")/i.test(h)||ooRe.test(h)){o.wordContent=true;h=h.replace(ooRe,'','g');h=h.replace(/[\s\S]+?<meta[^>]*>/,'');h=h.replace(/<!--[\s\S]+?-->/gi,'');h=h.replace(/<style[^>]*>[\s\S]+?<\/style>/gi,'');}
if(/(class=\"?Mso|style=\"[^\"]*\bmso\-|w:WordDocument)/.test(h)){o.wordContent=true;}
if(o.wordContent){h=this._processWordContent(h);}
if(ed.getParam('clipboard_paste_remove_attributes')){var attribs=ed.getParam('clipboard_paste_remove_attributes').split(',');h=h.replace(new RegExp(' ('+attribs.join('|')+')="([^"]+)"','gi'),'');}
if(rb=ed.getParam('forced_root_block')){var blocks='';if(h.indexOf('<br><br>')!=-1){tinymce.each(h.split('<br><br>'),function(block){blocks+='<'+rb+'>'+block+'</'+rb+'>';});h=blocks;}}
var stripClasses=ed.getParam('clipboard_paste_strip_class_attributes');if(stripClasses=='none'||stripClasses=='mso'){stripClasses=false;}
if(stripClasses||o.wordContent){function removeClasses(match,g1){if(stripClasses){return'';}
if(o.wordContent){var cls=tinymce.grep(tinymce.explode(g1.replace(/^(["'])(.*)\1$/,"$2")," "),function(v){return(/^(?!mso)/i.test(v));});}
return cls.length?' class="'+cls.join(" ")+'"':'';}
h=h.replace(/ class="([^"]+)"/gi,removeClasses);h=h.replace(/ class=([\-\w]+)/gi,removeClasses);}
h=h.replace(/&nbsp;/g,'\u00a0');if(ed.getParam('clipboard_paste_remove_spans')){if(ed.settings.inline_styles){h=h.replace(/<\/?(u|strike)[^>]*>/gi,'');if(ed.settings.convert_fonts_to_spans){h=h.replace(/<\/?(font)[^>]*>/gi,'');}}
h=h.replace(/<\/?(span)[^>]*>/gi,'');}
if(!ed.getParam('forced_root_block')){if(ed.getParam('clipboard_paste_remove_empty_paragraphs',true)){h=h.replace(/<p([^>]*)>(\s|&nbsp;|\u00a0)*<\/p>/gi,'');}
h=h.replace(/<\/(p|div)>/gi,'<br /><br />').replace(/<(p|div)([^>]*)>/g,'').replace(/(<br \/>){2}$/g,'');}
h=h.replace(/Version:[\d.]+\nStartHTML:\d+\nEndHTML:\d+\nStartFragment:\d+\nEndFragment:\d+/gi,'');if(ed.getParam('clipboard_paste_convert_urls',true)){h=this._convertURLs(h);}
if(ed.settings.verify_html===false){h=h.replace(/<b\b([^>]*)>/gi,'<strong$1>');h=h.replace(/<\/b>/gi,'</strong>');}
o.content=h;},_cleanWordContent:function(h){h=h.replace(/<meta([^>]+)>/,'');h=h.replace(/<!--[\s\S]+?-->/gi,'');h=h.replace(/<style([^>]*)>([\w\W]*?)<\/style>/gi,'');h=h.replace(/<(!|script[^>]*>.*?<\/script(?=[>\s])|\/?(\?xml(:\w+)?|meta|link|\w:\w+)(?=[\s\/>]))[^>]*>/gi,'');return h;},_processFootNotes:function(h){var ed=this.editor;var footnotes=ed.getParam('clipboard_paste_process_footnotes','convert');if(footnotes=='remove'){h=h.replace(/<div[^>]+(mso-element:(end|foot)note|sdfootnote)[^>]+>[\s\S]+?<\/div>/gi,'');h=h.replace(/<div id="(edn|ftn)">[\s\S]+?<\/div>/gi,'');}else{h=h.replace(/<div[^>]+mso-element:\s*((end|foot)note|sdfootnote)[^>]+>/gi,'');h=h.replace(/<div id="(edn|ftn)">/gi,'');}
h=h.replace('<div><!--\[if !supportFootnotes\]--><br clear="all">','');if(footnotes==='convert'){h=h.replace(/<a\b([^>]+)style="(mso-(end|foot)note-id|sdfootnoteanc)[^"]+"([^>]+)>/gi,'<a$1data-mce-footnote="1"$4>');}else if(footnotes==='unlink'){h=h.replace(/<a\b[^>]+(mso-(end|foot)note-id|sdfootnoteanc)[^>]+>([\s\S]+?)<\/a>/gi,'$3');}else if(footnotes==='remove'){h=h.replace(/<a\b[^>]+(mso-(end|foot)note-id|sdfootnoteanc)[^>]+>([\s\S]+?)<\/a>/gi,'');}
h=h.replace(/<a\b([^>]+)href="([^"]+)"([^>]+)>(.*?)<!--\[if !supportFootnotes\]-->(.*?)<\/a>/gi,function(a,b,c,d,e,f){var s=e+f;s=s.replace('<!--[endif]-->','').replace(/<\/?span([^>]*)>/g,'');if(footnotes==='convert'){return'<a data-mce-footnote="1"'+b+'href="'+c+'"'+d+'>'+s+'</a>';}
if(footnotes==='unlink'){return s;}
return"";});return h;},_processWordContent:function(h){var ed=this.editor,stripClass,len;if(ed.getParam('clipboard_paste_convert_lists',true)){h=h.replace(/<!--\[if !supportLists\]-->/gi,'__MCE_LIST_ITEM__');h=h.replace(/(<span[^>]+:\s*symbol[^>]+>)/gi,'$1__MCE_LIST_ITEM__');h=h.replace(/(<span[^>]+mso-list:[^>]+>)/gi,'$1__MCE_LIST_ITEM__');h=h.replace(/(<p[^>]+(?:MsoListParagraph)[^>]+>)/gi,'$1__MCE_LIST_ITEM__');}
h=this._processFootNotes(h);h=this._cleanWordContent(h);h=h.replace(/<(\/?)s>/gi,"<$1strike>");h=h.replace(/&nbsp;/gi,"\u00a0");do{len=h.length;h=h.replace(/(<[a-z][^>]*\s)(?:id|language|type|on\w+|\w+:\w+)=(?:"[^"]*"|\w+)\s?/gi,"$1");}while(len!=h.length);if(!ed.getParam('clipboard_paste_remove_styles')){h=h.replace(/<span\s+style\s*=\s*"\s*mso-spacerun\s*:\s*yes\s*;?\s*"\s*>([\s\u00a0]*)<\/span>/gi,function(str,spaces){return(spaces.length>0)?spaces.replace(/./," ").slice(Math.floor(spaces.length/2)).split("").join("\u00a0"):"";});h=h.replace(/(<[a-z][^>]*)\sstyle="([^"]*)"/gi,function(str,tag,style){var n=[],i=0,s=tinymce.explode(tinymce.trim(style).replace(/&quot;/gi,"'"),";");each(s,function(v){var name,value,parts=tinymce.explode(v,":");function ensureUnits(v){return v+((v!=="0")&&(/\d$/.test(v)))?"px":"";}
if(parts.length==2){name=parts[0].toLowerCase();value=parts[1].toLowerCase();switch(name){case"mso-padding-alt":case"mso-padding-top-alt":case"mso-padding-right-alt":case"mso-padding-bottom-alt":case"mso-padding-left-alt":case"mso-margin-alt":case"mso-margin-top-alt":case"mso-margin-right-alt":case"mso-margin-bottom-alt":case"mso-margin-left-alt":case"mso-table-layout-alt":case"mso-height":case"mso-width":case"mso-vertical-align-alt":n[i++]=name.replace(/^mso-|-alt$/g,"")+":"+ensureUnits(value);return;case"horiz-align":n[i++]="text-align:"+value;return;case"vert-align":n[i++]="vertical-align:"+value;return;case"font-color":case"mso-foreground":n[i++]="color:"+value;return;case"mso-background":case"mso-highlight":n[i++]="background:"+value;return;case"mso-default-height":n[i++]="min-height:"+ensureUnits(value);return;case"mso-default-width":n[i++]="min-width:"+ensureUnits(value);return;case"mso-padding-between-alt":n[i++]="border-collapse:separate;border-spacing:"+ensureUnits(value);return;case"text-line-through":if((value=="single")||(value=="double")){n[i++]="text-decoration:line-through";}
return;case"mso-zero-height":if(value=="yes"){n[i++]="display:none";}
return;case'mso-special-character':if(value=="footnote"){n[i++]='vertical-align:super';}
break;}
if(/^(mso|column|font-emph|lang|layout|line-break|list-image|nav|panose|punct|row|ruby|sep|size|src|tab-|table-border|text-(?!align|decor|indent|trans)|top-bar|version|vnd|word-break)/.test(name)){return;}
n[i++]=name+":"+parts[1];}});if(i>0){return tag+' style="'+n.join(';')+'"';}else{return tag;}});}
if(ed.getParam('forced_root_block')){h=h.replace(/<br><br>/gi,'');}
return h;},_insertPlainText:function(h){var ed=this.editor,dom=ed.dom,rb,entities=null;if((typeof(h)==="string")&&(h.length>0)){h=this._cleanWordContent(h);if(/<(?:p|br|h[1-6]|ul|ol|dl|table|t[rdh]|div|blockquote|fieldset|pre|address|center)[^>]*>/i.test(h)){h=h.replace(/[\n\r]+/g,'');}else{h=h.replace(/\r+/g,'');}
h=h.replace(/<\/(?:p|h[1-6]|ul|ol|dl|table|div|blockquote|fieldset|pre|address|center)>/gi,"\n\n");h=h.replace(/<br[^>]*>|<\/tr>/gi,"\n");h=h.replace(/<\/t[dh]>\s*<t[dh][^>]*>/gi,"\t");h=h.replace(/<[a-z!\/?][^>]*>/gi,'');h=h.replace(/&nbsp;/gi," ");h=dom.decode(tinymce.html.Entities.encodeRaw(h));h=h.replace(/(?:(?!\n)\s)*(\n+)(?:(?!\n)\s)*/gi,"$1");h=h.replace(/\n{3,}/g,"\n\n");h=h.replace(/^\s+|\s+$/g,'');h=h.replace(/\u2026/g,"...");h=h.replace(/[\x93\x94\u201c\u201d]/g,'"');h=h.replace(/[\x60\x91\x92\u2018\u2019]/g,"'");if(rb=ed.getParam("forced_root_block")){h=h.replace(/^\s+|\s+$/g,'');h=h.replace(/\n\n/g,'</'+rb+'><'+rb+'>');}
h=h.replace(/\n+?/g,'<br />');if(ed.getParam('clipboard_paste_remove_empty_paragraphs',true)){h=h.replace(/<p>(\s|&nbsp;|\u00a0)?<\/p>/gi,'');}}
this._insert(h);},_convertToInline:function(node){var ed=this.editor,dom=ed.dom;var fontSizes=tinymce.explode(ed.settings.font_size_style_values);function replaceWithSpan(n,styles){tinymce.each(styles,function(value,name){if(value)
dom.setStyle(n,name,value);});dom.rename(n,'span');}
filters={font:function(n){replaceWithSpan(n,{backgroundColor:n.style.backgroundColor,color:n.color,fontFamily:n.face,fontSize:fontSizes[parseInt(n.size)-1]});},u:function(n){replaceWithSpan(n,{textDecoration:'underline'});},strike:function(n){replaceWithSpan(n,{textDecoration:'line-through'});}};if(ed.settings.convert_fonts_to_spans){tinymce.each(dom.select('font,u,strike',node),function(n){filters[n.nodeName.toLowerCase()](n);});}},_processStyles:function(node){var ed=this.editor,dom=ed.dom;var s=ed.getParam('clipboard_paste_retain_style_properties');if(s&&tinymce.is(s,'string')){styleProps=tinymce.explode(s);}
each(dom.select('*[style]',node),function(n){var ns={},x=0;var styles=dom.parseStyle(n.style.cssText);each(styles,function(v,k){if(tinymce.inArray(styleProps,k)!=-1){ns[k]=v;x++;}});dom.setAttrib(n,'style','');if(x>0){dom.setStyles(n,ns);}else{if(n.nodeName=='SPAN'&&!n.className){dom.remove(n,true);}}
if(tinymce.isWebKit){n.removeAttribute('data-mce-style');}});},_convertURLs:function(h){var ex='([-!#$%&\'\*\+\\./0-9=?A-Z^_`a-z{|}~]+@[-!#$%&\'\*\+\\/0-9=?A-Z^_`a-z{|}~]+\.[-!#$%&\'*+\\./0-9=?A-Z^_`a-z{|}~]+)';var ux='((news|telnet|nttp|file|http|ftp|https)://[-!#$%&\'\*\+\\/0-9=?A-Z^_`a-z{|}~;]+\.[-!#$%&\'\*\+\\./0-9=?A-Z^_`a-z{|}~;]+)';h=h.replace(new RegExp('(=["\']|>)?'+ux,'g'),function(a,b,c){if(!b){return'<a href="'+c+'">'+c+'</a>';}
return a;});h=h.replace(new RegExp('(=["\']mailto:|>)?'+ex,'g'),function(a,b,c){if(!b){return'<a href="mailto:'+c+'">'+c+'</a>';}
return a;});return h;},_convertFootNotes:function(node){var ed=this.editor,dom=ed.dom;each(dom.select('a[data-mce-footnote]',node),function(n,i){var anchor,id,href=n.getAttribute('href');dom.remove(ed.dom.select('span',n),1);n.removeAttribute('data-mce-footnote');n.removeAttribute('title');dom.setStyle(n,'vertical-align','super');if(href.charAt(0)==='#'){id=href.substring(1);}
if(id){if(!n.id){dom.setAttrib(n,'id','ftnref'+id.replace(/\D/g,''));}
anchor=dom.select('a[name="'+id+'"]',node);if(anchor.length){anchor=anchor[0];id=id.replace(/[^a-z]+(\w+)/gi,'$1');var attribs={'class':'mceItemAnchor','name':null,'id':null,'href':'#'+n.id};var k=ed.settings.schema=='html5'?'id':'name';attribs[k]=id;dom.setAttribs(anchor,attribs);dom.setAttribs(n,{'href':'#'+id});}}});},_postProcess:function(pl,o){var self=this,ed=this.editor,dom=ed.dom,h;if(ed.settings.paste_enable_default_filters==false){return;}
if(this.plainText){return;}
each(dom.select('span.Apple-style-span',o.node),function(n){dom.remove(n,1);});if(!ed.getParam('clipboard_paste_remove_spans')){if(ed.settings.inline_styles){this._convertToInline(o.node);}}
if(o.wordContent){dom.remove(dom.select('a[name="_GoBack"]',o.node),1);each(dom.select('a',o.node),function(n){var href=n.getAttribute('href');if(!href||href.indexOf('#_Toc')===0){dom.remove(n,1);}});if(ed.getParam('clipboard_paste_convert_lists',true)){this._convertLists(o.node);}
if(ed.getParam('clipboard_paste_process_footnotes','convert')==='convert'){this._convertFootNotes(o.node);}
each(dom.select('*[lang]',o.node),function(el){el.removeAttribute('lang');});}
if(ed.getParam('clipboard_paste_remove_styles')){each(dom.select('*[style]',o.node),function(el){el.removeAttribute('style');el.removeAttribute('data-mce-style');});}else{this._processStyles(o.node);}
var imgRe=/(file:|data:image)\//i,uploader=ed.plugins.upload;var canUpload=uploader&&uploader.plugins.length;each(dom.select('img',o.node),function(el){var s=dom.getAttrib(el,'src');if(!s||imgRe.test(s)){if(ed.getParam('clipboard_paste_upload_images')&&canUpload){ed.dom.setAttrib(el,'data-mce-upload-marker','1');}else{dom.remove(el);}}else{dom.setAttrib(el,'src',ed.convertURL(s));}});each(dom.select('a',o.node),function(el){var s=dom.getAttrib(el,'href');if(s){if(s.charAt(0)!='#'){dom.getAttrib(el,'href',ed.convertURL(s));}}else{if(!el.name||!el.id){dom.remove(el);}}});if(ed.getParam('clipboard_paste_remove_tags')){dom.remove(dom.select(ed.getParam('clipboard_paste_remove_tags'),o.node),1);}
if(ed.getParam('clipboard_paste_keep_tags')){var tags=ed.getParam('clipboard_paste_keep_tags');dom.remove(dom.select('*:not('+tags+')',o.node),1);}
var emptyRe=/^(\s|&nbsp;|\u00a0)?$/;if(ed.getParam('clipboard_paste_remove_spans')){dom.remove(dom.select('span',o.node),1);}else{ed.dom.remove(dom.select('span:empty',o.node));each(dom.select('span',o.node),function(n){var h=n.innerHTML;if(emptyRe.test(h)){dom.remove(n);}
if(dom.getAttribs(n).length===0){dom.remove(n,1);}});}
if(ed.getParam('clipboard_paste_remove_empty_paragraphs',true)){dom.remove(dom.select('p:empty',o.node));each(dom.select('p',o.node),function(n){var h=n.innerHTML;if(emptyRe.test(h)){dom.remove(n);}});}},_convertLists:function(node){var ed=this.editor,dom=ed.dom,listElm,li,lastMargin=-1,margin,levels=[],lastType;var ULRX=/^(__MCE_LIST_ITEM__)*\s*[\u2022\u00b7\u00a7\u00d8o\u25CF]\s*\u00a0*/;var OLRX=/^(__MCE_LIST_ITEM__)*\s*\(?(\w+)(\.|\))\s*\u00a0*/;each(dom.select('p, h1, h2, h3, h4, h5, h6',node),function(p,i){var sib,val='',type,html,idx,parents,s,chars,st,start;html=p.innerHTML;if(html.indexOf('__MCE_LIST_ITEM__')===-1){return;}
val=html.replace(/<\/?\w+[^>]*>/gi,'').replace(/&nbsp;/g,'\u00a0');if(ULRX.test(val)){type='ul';}
if(s=val.match(OLRX)){type='ol';chars=s[2];if(chars&&chars!='__MCE_LIST_ITEM__'){if(/[a-z+?]/.test(chars)){st='lower-alpha';}
if(/[A-Z+?]/.test(chars)){st='upper-alpha';}
if(/[ivx+]/.test(chars)){st='lower-roman';}
if(/[IVX+]/.test(chars)){st='upper-roman';}
if(i===0&&!st&&parseInt(chars)>1){start=parseInt(chars);}}}
if(type){margin=parseFloat(p.style.marginLeft||0);if(margin>lastMargin){levels.push(margin);}
if(!listElm||type!=lastType){listElm=dom.create(type);dom.insertAfter(listElm,p);}else{if(margin>lastMargin){listElm=dom.add(li,type);}else if(margin<lastMargin){idx=tinymce.inArray(levels,margin);parents=dom.getParents(listElm.parentNode,type);listElm=parents[parents.length-1-idx]||listElm;}}
each(dom.select('span',p),function(span){var html=span.innerHTML.replace(/<\/?\w+[^>]*>/gi,'').replace(/&nbsp;/g,'\u00a0');if(ULRX.test(html)||OLRX.test(html)){dom.remove(span,html.indexOf('__MCE_LIST_ITEM__')!==-1);}
if(/^(\s|\u00a0|&nbsp;)+$/.test(html)){dom.remove(span);}
if(dom.getAttribs(span).length===0){dom.remove(span,1);}});html=p.innerHTML;if(type=='ul'){html=html.replace(ULRX,'');}else{html=html.replace(OLRX,'');}
var args={'start':start};li=dom.add(listElm,'li',args,html);if(st&&typeof st!='undefined'){dom.setStyle(li,'list-style-type',st);}
dom.remove(p);lastMargin=margin;lastType=type;}else{listElm=lastMargin=0;}});var h=node.innerHTML;if(h.indexOf('__MCE_LIST_ITEM__')!==-1){node.innerHTML=h.replace(/__MCE_LIST_ITEM__/g,'');}},_insert:function(h,skip_undo){var ed=this.editor;if(ed.getParam('clipboard_paste_remove_empty_paragraphs',true)){h=h.replace(/<p([^>]+)>(&nbsp;|\u00a0)?<\/p>/g,'');}
if(ed.getParam('clipboard_paste_filter')){var re,rules=ed.getParam('clipboard_paste_filter').split(';');each(rules,function(s){if(/^\/.*\/(g|i|m)*$/.test(s)){re=(new Function('return '+s))();}else{re=new RegExp(s);}
h=h.replace(re,"");});}
ed.execCommand('mceInsertContent',false,h,{skip_undo:skip_undo});}});tinymce.PluginManager.add('clipboard',tinymce.plugins.ClipboardPlugin);})();