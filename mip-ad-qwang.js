define("mip-ad/mip-ad-qwang",["require"],function(e){function t(e,t){var i=e.getAttribute("cpro_psid"),a=e.getAttribute("cpro_pswidth")||"auto",o=e.getAttribute("cpro_psheight")||"230",r=['var cpro_psid ="'+i+'";','var cpro_pswidth ="'+a+'";','var cpro_psheight="'+o+'";'].join(""),c=document.createElement("script");c.innerHTML=r;var s=document.createElement("div");s.appendChild(c),e.appendChild(s),n(s,t)}function n(e,t){var n;if(n=i("MIP_ADQW_EMBED","//su.bdimg.com/static/dspui/js/um_mip.js"))e.appendChild(n),n.onload=function(){t.applyFillContent(e,!0)}}function i(e,t){var n=document.createElement("script");return n.src=t,n.id=e,n}return{render:t}});