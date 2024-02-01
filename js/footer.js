(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
})((function () { 'use strict';

    /**
     * UtilityCSS  - by Nicolas Riciotti
     * Based on Atomic CSS philosphy, without generating any extra classes
     * Instead, this script will check each "class" attributes in the DOM matching the follwing patterns:
     *     (variant):property:value|CssVariable@mediaQuery
     * then will inject in the head of the page the proper CSS code matching the class declaration
     * 
     * exemple:
     *   bg:red  => .bg\:red { background-color:red; }
     *   mb:3vr  => .mb\:3vr { margin-bottom: 3 * var(--unit-vr); }
     *   items:center  => .items\:center { align-items: center; }
     * 
     * It uses a MutationObserver to detect any 'class' attribute changes and update the injected CSS
     * 
     */

    console.log('Utilitycsss - v2');
    (function () {
      if (document.readyState === 'complete') {
        onDomReady();
      } else {
        window.addEventListener("DOMContentLoaded", onDomReady);
      }
      function onDomReady() {
        console.log('Utilitycsss / onDomReady');
        let stylesPrefix = '[mks-block] ';
        let helpers = {
          mask: 'overflow:hidden;',
          center: 'display:flex;align-items:center;justify-content:center;',
          circle: 'border-radius: 100%;',
          sticky: 'position:sticky',
          wrap: 'flex-wrap:wrap;',
          relative: 'position: relative;',
          rel: 'position: relative;',
          fit: 'height:100%; width: 100%;',
          grid: 'display: grid; grid-template-columns:repeat(var(--grid-cols), minmax(0, 1fr));',
          flex: 'display: flex;',
          iflex: 'display: inline-flex;',
          block: 'display: block;',
          iblock: 'display: inline-block;',
          abs: 'position:absolute;',
          absolute: 'position:absolute;',
          fix: 'position:fixed;',
          fixed: 'position:fixed;',
          none: 'display: none;',
          hidden: 'visibility: hidden;',
          fill: 'fill:currentColor',
          stroke: 'stroke:currentColor',
          bg: 'background-color:currentColor',
          c: 'color:currentColor',
          border: 'border: solid 1px currentColor;',
          shadow: '--shadowX:0;--shadowY:0;--shadowBlur:10px;--shadowColor:rgba(0,0,0,0.5); box-shadow: var(--shadowX) var(--shadowY) var(--shadowBlur) var(--shadowColor);',
          transform: '--translateX:0;--translateY:0; --rotate:0; --scaleX:1; --scaleY:1; will-change:transform; transform: translate(var(--translateX), var(--translateY)) rotate(var(--rotate)) scale(var(--scaleX), var(--scaleY)) translateZ(0);',
          before: {
            selector: '::before',
            prop: 'content: \'\';display:inline-block;'
          },
          after: {
            selector: '::after',
            prop: 'content: \'\';display:inline-block;'
          },
          pusht: 'top: 100%',
          pushr: 'right: 100%',
          pushb: 'bottom: 100%',
          pushl: 'left: 100%',
          nowrap: 'white-space:nowrap',
          //to simplify font helpers and avoid conflcit between fs(font-size) and fs(font-style)
          'italic': 'font-style:italic',
          'normal': 'font-style:normal',
          'aa': '-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;',
          'auto-aa': '-webkit-font-smoothing: auto;-moz-osx-font-smoothing: auto;',
          uppercase: 'text-transform: uppercase',
          underline: 'text-decoration:underline'
        };
        let propsAlias = {
          'indent': 'text-indent',
          'text-indent': 'text-indent',
          'col-gap': 'column-gap',
          'col-count': 'column-count',
          'perspective': 'perspective',
          'white-space': "white-space",
          'all': "all",
          'content': 'content',
          'dashoffset': 'stroke-dashoffset',
          'dasharray': 'stroke-dasharray',
          'blend': 'mix-blend-mode',
          'backdrop': 'backdrop-filter',
          'filter': 'filter',
          'float': 'float',
          'clear': 'clear',
          //Typography
          'fs': 'font-size',
          'fw': 'font-weight',
          'ff': 'font-family',
          'lh': 'line-height',
          'spacing': 'letter-spacing',
          'letter': 'letter-spacing',
          //top/left/right/bottom
          t: 'top',
          tl: 'top,left',
          tr: 'top,right',
          l: 'left',
          b: 'bottom',
          bl: 'bottom,left',
          br: 'bottom,right',
          r: 'right',
          //padding
          p: 'padding',
          'p-t': 'padding-top',
          'p-tl': 'padding-top, padding-left',
          'p-lt': 'padding-left, padding-top',
          'p-l': 'padding-left',
          'p-b': 'padding-bottom',
          'p-bl': 'padding-bottom, padding-left',
          'p-lb': 'padding-left, padding-bottom',
          'p-r': 'padding-right',
          'p-tr': 'padding-top, padding-right',
          'p-rt': 'padding-right, padding-top',
          'p-x': 'padding-right, padding-left',
          'p-y': 'padding-top, padding-bottom',
          //Margin
          m: 'margin',
          'm-t': 'margin-top',
          'm-l': 'margin-left',
          'm-b': 'margin-bottom',
          'm-r': 'margin-right',
          'm-x': 'margin-left, margin-right',
          'm-y': 'margin-top, margin-bottom',
          w: 'width',
          h: 'height',
          //Colors
          c: 'color',
          bg: 'background',
          'bg-clip': 'background-clip, -webkit-background-clip',
          'bg-size': 'background-size',
          'bg-pos': 'background-position',
          'bg-img': 'background-image',
          'bg-repeat': 'background-repeat',
          'bg-color': 'background-color',
          fill: 'fill',
          stroke: 'stroke',
          //Size
          'min-w': 'min-width',
          'min-h': 'min-height',
          'max-w': 'max-width',
          'max-h': 'max-height',
          //Flex
          dir: 'flex-direction',
          direction: 'flex-direction',
          justify: 'justify-content',
          just: 'justify-content',
          align: 'text-align',
          'align-x': 'text-align',
          'align-y': 'vertical-align',
          items: 'align-items',
          grow: 'flex-grow',
          wrap: 'flex-wrap',
          shrink: 'flex-shrink',
          //adds space betweeen its children nodes
          'space-x': {
            selector: '> *:not(:last-child)',
            prop: 'margin-right'
          },
          'space-y': {
            selector: '> *:not(:last-child)',
            prop: 'margin-bottom'
          },
          //adds border betweeen its children nodes
          'div-x': {
            selector: '> *:not(:last-child)',
            prop: 'border-right: solid 1px; border-right-color'
          },
          'div-y': {
            selector: '> *:not(:last-child)',
            prop: 'border-bottom: solid 1px; border-bottom-color'
          },
          //Transforms
          'origin': 'transform-origin',
          'skew-x': '--skewX',
          'skew-y': '--skewY',
          'shift': '--translateX, --translateY',
          'shift-x': '--translateX',
          'shift-y': '--translateY',
          'shift-z': '--translateZ',
          'translate': '--translateX, --translateY',
          'translate-x': '--translateX',
          'translate-y': '--translateY',
          'translate-z': '--translateZ',
          'rotate': '--rotate',
          'rotate-x': '--rotateX',
          'rotate-y': '--rotateY',
          'scale': '--scaleX, --scaleY',
          'scale-x': '--scaleX',
          'scale-y': '--scaleY',
          //Grids
          'cols': '--grid-cols',
          'gap': 'gap',
          'gap-x': 'column-gap',
          'gap-y': 'row-gap',
          'auto-rows': 'grid-auto-rows',
          'auto-flow': 'grid-auto-flow',
          'auto-cols': 'grid-auto-columns',
          //Shadow
          'text-shadow': 'text-shadow',
          'box-shadow': 'box-shadow',
          '--sh-x': '--shadowX',
          '--sh-y': '--shadowY',
          '--sh-b': '--shadowBlur',
          '--sh-c': '--shadowColor',
          //Borders
          'border': 'border',
          //need to use full name to avoid conflcit with 'b:bottom'

          'b-t': 'border-top',
          //can receive comma separated values
          'b-r': 'border-right',
          //can receive comma separated values
          'b-b': 'border-bottom',
          //can receive comma separated values
          'b-l': 'border-left',
          //can receive comma separated values
          'b-tr': 'border-top-right',
          //can receive comma separated values
          'b-br': 'border-bottom-right',
          //can receive comma separated values
          'b-bl': 'border-bottom-left',
          //can receive comma separated values
          'b-tl': 'border-top-left',
          //can receive comma separated values

          'bc': 'border-color',
          'bc-t': 'border-top-color',
          'bc-r': 'border-right-color',
          'bc-b': 'border-bottom-color',
          'bc-l': 'border-left-color',
          'bc-tr': 'border-top-right-color',
          'bc-br': 'border-bottom-right-color',
          'bc-bl': 'border-bottom-left-color',
          'bc-tl': 'border-top-left-color',
          'bw': 'border-width',
          'bw-t': 'border-top-width',
          'bw-r': 'border-right-width',
          'bw-b': 'border-bottom-width',
          'bw-l': 'border-left-width',
          'bw-tr': 'border-top-right-width',
          'bw-br': 'border-bottom-right-width',
          'bw-bl': 'border-bottom-left-width',
          'bw-tl': 'border-top-left-width',
          'bs': 'border-style',
          'bs-t': 'border-top-style',
          'bs-r': 'border-right-style',
          'bs-b': 'border-bottom-style',
          'bs-l': 'border-left-style',
          'bs-tr': 'border-top-right-style',
          'bs-br': 'border-bottom-right-style',
          'bs-bl': 'border-bottom-left-style',
          'bs-tl': 'border-top-left-style',
          'radius': 'border-radius',
          'radius-t': 'border-top-radius',
          'radius-r': 'border-right-radius',
          'radius-b': 'border-bottom-radius',
          'radius-l': 'border-left-radius',
          'radius-tr': 'border-top-right-radius',
          'radius-br': 'border-bottom-right-radius',
          'radius-bl': 'border-bottom-left-radius',
          'radius-tl': 'border-top-left-radius',
          'bo': 'border-opacity',
          'bo-t': 'border-top-opacity',
          'bo-r': 'border-right-opacity',
          'bo-b': 'border-bottom-opacity',
          'bo-l': 'border-left-opacity',
          'bo-tr': 'border-top-right-opacity',
          'bo-br': 'border-bottom-right-opacity',
          'bo-bl': 'border-bottom-left-opacity',
          'bo-tl': 'border-top-left-opacity',
          //Misc
          display: 'display',
          d: 'display',
          object: 'object-fit',
          scroll: 'overscroll-behavior',
          list: 'list-style',
          decoration: 'text-decoration',
          case: 'text-transform',
          pos: 'position',
          pointer: 'pointer-events',
          cursor: 'cursor',
          appearance: 'appearance',
          'z': 'z-index',
          'index': 'z-index',
          'o': 'opacity',
          'opacity': 'opacity',
          'alpha': 'opacity',
          'overflow': 'overflow',
          'overflow-x': 'overflow-x',
          'overflow-y': 'overflow-y',
          'deco': 'text-decoration',
          'transition': 'transition',
          'animation': 'animation',
          'anim': 'animation',
          'tween': 'transition',
          'tween-delay': 'transition-delay',
          'delay': 'transition-delay',
          'tween-property': 'transition-property',
          'property': 'transition-property',
          'prop': 'transition-property',
          'tween-length': 'transition-duration',
          'tween-duration': 'transition-duration',
          'tween-ease': 'transition-timing-function',
          'anim-delay': 'animation-delay',
          'anim-duration': 'animation-duration',
          'anim-ease': 'animation-timing-function'
        };
        let variants = {
          'even': {
            pre: '',
            post: ':nth-child(even)'
          },
          'odd': {
            pre: '',
            post: ':nth-child(odd)'
          },
          'child-1': {
            pre: '',
            post: ':nth-child(1)'
          },
          'child-2': {
            pre: '',
            post: ':nth-child(2)'
          },
          'child-3': {
            pre: '',
            post: ':nth-child(3)'
          },
          'child-4': {
            pre: '',
            post: ':nth-child(4)'
          },
          'child-5': {
            pre: '',
            post: ':nth-child(5)'
          },
          'child-6': {
            pre: '',
            post: ':nth-child(6)'
          },
          'child-7': {
            pre: '',
            post: ':nth-child(7)'
          },
          'child-8': {
            pre: '',
            post: ':nth-child(8)'
          },
          'child-9': {
            pre: '',
            post: ':nth-child(9)'
          },
          'child-10': {
            pre: '',
            post: ':nth-child(10)'
          },
          'last-child': {
            pre: '',
            post: ':last-child'
          },
          'disabled': {
            pre: '',
            post: ':disabled'
          },
          'hover': {
            pre: '',
            post: ':hover'
          },
          'parent-hover': {
            pre: ':hover > ',
            post: ''
          },
          'parents-hover': {
            pre: ':hover ',
            post: ''
          },
          'sibling-hover': {
            pre: ':hover ~ ',
            post: ''
          },
          'previous-hover': {
            pre: ':hover + ',
            post: ''
          },
          'group-hover': {
            pre: '.group:hover ',
            post: ''
          },
          'has-js': {
            pre: '.has-js ',
            post: ''
          },
          'checked': {
            pre: '',
            post: ':checked'
          },
          'parent-checked': {
            pre: ':checked > ',
            post: ''
          },
          'parents-checked': {
            pre: ':checked ',
            post: ''
          },
          'sibling-checked': {
            pre: ':checked ~ ',
            post: ''
          },
          'previous-checked': {
            pre: ':checked + ',
            post: ''
          },
          'group-checked': {
            pre: '.group:checked ',
            post: ''
          },
          'focus': {
            pre: '',
            post: ':focus'
          },
          'parent-focus': {
            pre: ':focus > ',
            post: ''
          },
          'parents-focus': {
            pre: ':focus ',
            post: ''
          },
          'sibling-focus': {
            pre: ':focus ~ ',
            post: ''
          },
          'previous-focus': {
            pre: ':focus + ',
            post: ''
          },
          'group-focus': {
            pre: '.group:focus ',
            post: ''
          },
          'active': {
            pre: '',
            post: ':active'
          },
          'parent-active': {
            pre: ':active > ',
            post: ''
          },
          'parents-active': {
            pre: ':active ',
            post: ''
          },
          'sibling-active': {
            pre: ':active ~ ',
            post: ''
          },
          'previous-active': {
            pre: ':active + ',
            post: ''
          },
          'group-active': {
            pre: '.group:active ',
            post: ''
          },
          'in-view': {
            pre: '.in-view ',
            post: ''
          },
          'parents-is-active': {
            pre: '.is-ready .is-active ',
            post: ''
          },
          'parent-is-active': {
            pre: '.is-ready .is-active > ',
            post: ''
          },
          'group-is-active': {
            pre: '.is-ready .group.is-active ',
            post: ''
          },
          'anim-in': {
            pre: '.is-ready .is-active ',
            post: ''
          },
          'ready': {
            pre: '.is-ready ',
            post: ''
          },
          'placeholder': {
            pre: '',
            post: '::placeholder '
          },
          'has-placeholder': {
            pre: '',
            post: ':placeholder-shown '
          },
          'sibling-has-placeholder': {
            pre: ':placeholder-shown ~ ',
            post: ''
          },
          'previous-has-placeholder': {
            pre: ':active + ',
            post: ''
          },
          'scrollbar': {
            pre: '',
            post: '::-webkit-scrollbar'
          },
          'scroll-track': {
            pre: '',
            post: '::-webkit-scrollbar-track'
          },
          'scroll-thumb': {
            pre: '',
            post: '::-webkit-scrollbar-thumb'
          },
          'scroll-button': {
            pre: '',
            post: '::-webkit-scrollbar-button'
          },
          'after': {
            post: '::after',
            pre: ''
          },
          'before': {
            post: '::before',
            pre: ''
          }
        };
        let valuesAlias = {
          between: 'space-between',
          around: 'space-around',
          evenly: 'space-evenly',
          start: 'flex-start',
          end: 'flex-end',
          fit: '100%',
          current: 'currentColor',
          abs: 'absolute',
          col: 'column',
          trans: 'transparent'
        };
        let cache = {};
        let propRegPart = '';
        let variantRegPart = '';
        let selector = '';
        let helperRegPart = '';
        for (let h in helpers) {
          selector += `.${h},`;
          helperRegPart += h + '|';
        }
        for (let p in propsAlias) {
          selector += `[class*='${p}:'],`;
          propRegPart += p + '|';
        }
        for (let v in variants) {
          selector += `[class*='${v}:'],`;
          variantRegPart += v.replace(/\-/, '\\-') + '|';
        }
        propRegPart = propRegPart.replace(/\|$/, '');
        helperRegPart = helperRegPart.replace(/\|$/, '');
        selector = selector.replace(/\,$/, '');
        variantRegPart = variantRegPart.replace(/\|$/, '');
        let helperReg = new RegExp('^' + helperRegPart + '$');
        let utilReg = new RegExp('^(' + propRegPart + ')\\:[^\\s]+');
        let variantReg = new RegExp('^(' + variantRegPart + ')\\:(.+)');

        //////////////////////////////////////////////////////
        //////////////////////////////////////////////////////
        //////////////////////////////////////////////////////
        let helperStyle = document.createElement('style');
        helperStyle.type = 'text/css';
        document.getElementsByTagName('head')[0].appendChild(helperStyle);
        //
        let aliasStyle = document.createElement('style');
        aliasStyle.type = 'text/css';
        aliasStyle.innerHTML += `:root {`;
        for (let k in valuesAlias) {
          aliasStyle.innerHTML += `--alias-${k}: ${valuesAlias[k]};`;
        }
        aliasStyle.innerHTML += `}`;
        document.getElementsByTagName('head')[0].appendChild(aliasStyle);
        //
        var style = document.createElement('style');
        style.type = 'text/css';
        document.getElementsByTagName('head')[0].appendChild(style);
        //
        var responsiveStyle = document.createElement('style');
        responsiveStyle.type = 'text/css';
        document.getElementsByTagName('head')[0].appendChild(responsiveStyle);
        var responsiveStyleCache = {};

        //////////////////////////////////////////////////////
        //////////////////////////////////////////////////////
        //////////////////////////////////////////////////////

        function parse(el, compCache) {
          let newStyles = '';
          let newResponsiveStyles = {};
          let newHelperStyles = '';
          let clss = el.getAttribute('class').replace(/\n/g, " ");
          if (/\([^)]+\)\:/.test(el.getAttribute('class'))) {
            clss = clss.replace(/\([^)]+\)/g, (a, b, c) => {
              return a.replace(/\s/g, ';');
            });
          }
          let clssArr = clss.split(' ');
          clssArr.forEach(cls => {
            let selectorPre = '';
            let selectorPost = '';
            let variantName = '';
            let hasVariant;
            if (/\([^)]+\)\:?/.test(cls)) {
              cls = cls.replace(/\;/g, ' ');
              let sel;
              cls = cls.replace(/\([^)]+\)\:?/, (a, b, c) => {
                sel = a;
                return '';
              });
              let selectorParts = sel.replace(/(\(|\))/g, '').replace(">>", ' ').replace(/\//g, ' ').replace(/\:$/, '').split(/\&/);
              selectorPre = (selectorParts[0] || '') + ' ';
              selectorPost = (selectorParts[1] || '') + ' ';
              hasVariant = true;
              variantName = sel.replace(/\(/g, '\\(').replace(/\)/g, '\\)').replace(/\&/g, '\\&').replace(/\$/g, '\\$').replace(/\+/g, '\\+').replace(/\~/g, '\\~').replace(/\>/g, '\\>').replace(/\//g, '\\/').replace(/\:/g, '\\:').replace(/\*/g, '\\*').replace(/\./g, '\\.').replace(/\s/g, '.');
            } else if (variantReg.test(cls)) {
              try {
                variantName = cls.replace(variantReg, (a, b) => b).replace(/(\r\n|\n|\r)/gm, "");
                cls = cls.replace(variantName + ':', '');
                selectorPre = variants[variantName].pre;
                selectorPost = variants[variantName].post;
                hasVariant = true;
                variantName += "\\:";
              } catch (e) {}
            }
            if (utilReg.test(cls)) {
              if (!cache[variantName + cls.replace(/([\W_])/g, a => '\\' + a)]) {
                let prop = cls.split(':')[0];
                let val = cls.split(':')[1];
                if (propsAlias[prop] != undefined) {
                  if (val === undefined) {
                    console.warn('missing value or wrong property syntax: "' + cls + '"');
                  } else {
                    let matchingprops = typeof propsAlias[prop] == 'string' ? propsAlias[prop].split(',') : propsAlias[prop].prop.split(',');
                    let selector = propsAlias[prop].selector ? propsAlias[prop].selector : '';
                    let clsContent = '';
                    let important = /\!/g.test(val) ? '!important' : '';
                    val = val.replace('!', '');
                    let queryStart = '';
                    if (/\@/.test(val)) {
                      let q;
                      val = val.replace(/\@(.*)/, (a, b, c) => {
                        q = b;
                        return '';
                      });
                      // if (compCache['--media-'+q]) {
                      // compCache['--media-'+q] = computedStyle.getPropertyValue('--media-'+q)
                      // }
                      if (compCache['--media-' + q]) {
                        queryStart = `${compCache['--media-' + q]}`;
                      }
                    }
                    matchingprops.forEach(propName => {
                      let valParts = val.split(',');
                      let totalVal = '';
                      valParts.forEach(val => {
                        // handle css custom units(vr, fx, fx, ect)
                        if (/^[0-9.-]+[^0-9.-]+$/.test(val)) {
                          let unit = val.replace(/^[0-9.-]+([^0-9.-]+)$/, (a, b) => b);
                          let num = val.replace(unit, '');
                          if (compCache['--unit-' + unit]) {
                            totalVal += `calc( ${num} * var(--unit-${unit}) )`;
                          } else {
                            if (unit === 'fxx') {
                              const wdth = document.querySelector('.acf-block-preview').clientWidth;
                              document.documentElement.style.setProperty('--vw', wdth);
                              document.documentElement.style.setProperty('--unit-fxx', `calc( var(--vw) / 1920 )`);
                              document.querySelectorAll('.acf-block-preview').forEach(el => {
                                el.style.setProperty('--vw', wdth);
                                el.style.setProperty('--unit-fxx', "calc( var(--vw) / 1920 )");
                              });
                              totalVal += `calc( ${num} * var(--unit-${unit}) )`;
                            } else {
                              totalVal += `${val}`;
                            }
                          }
                        } else {
                          //check for alias in CSS variables on :root
                          let aliasVar = `--alias-${val}`;
                          totalVal += compCache[aliasVar] ? `var(--alias-${val})` : val;
                        }
                        totalVal += propName === 'transition-property' ? ',' : ' '; //use white space to seperate values
                      });

                      clsContent += `${propName}: ${totalVal.replace(/\,$/, '')} ${important};`;
                    });
                    cls = cls.replace(/([\W_])/g, a => '\\' + a);
                    if (queryStart != '') {
                      newResponsiveStyles[queryStart] = newResponsiveStyles[queryStart] || '';
                      newResponsiveStyles[queryStart] += stylesPrefix + `${selectorPre}.${variantName}${cls}${selector}${selectorPost}{ ${clsContent} }`;
                    } else {
                      newStyles += stylesPrefix + `${selectorPre}.${variantName}${cls}${selector}${selectorPost}{ ${clsContent} }`;
                    }
                    cache[variantName + cls] = clsContent;
                  }
                }
              }
            }
            if (helperReg.test(cls.replace(/([\W_])/g, a => '\\' + a))) {
              let helpCls = cls.replace(/\@.*/, '');
              if (helpers[helpCls] != undefined && !cache[variantName + cls.replace(/([\W_])/g, a => '\\' + a)]) {
                let content = typeof helpers[helpCls] == 'string' ? helpers[helpCls] : helpers[helpCls].prop;
                let selector = helpers[helpCls].selector ? helpers[helpCls].selector : '';
                let queryStart = '';
                if (/\@/g.test(cls)) {
                  let q;
                  cls.replace(/\@(.*)/, (a, b, c) => {
                    q = b;
                    return '';
                  });
                  // compCache['--media-'+q] = compCache['--media-'+q] || computedStyle.getPropertyValue('--media-'+q)
                  if (compCache['--media-' + q]) {
                    queryStart = `${compCache['--media-' + q]}`;
                  }
                }
                if (queryStart != '') {
                  newResponsiveStyles[queryStart] = newResponsiveStyles[queryStart] || '';
                  newResponsiveStyles[queryStart] += stylesPrefix + ` .${variantName}${cls}${selector} { ${content} }`;
                } else {
                  newHelperStyles += stylesPrefix + ` .${variantName}${cls}${selector} { ${content} }`;
                }
                cache[variantName + cls.replace(/([\W_])/g, a => '\\' + a)] = `.${variantName}${cls}${selector} { ${content} }`;
              }
            }
          });
          ///////////////////////////////////////////////////////////////////
          ///////////////////////////////////////////////////////////////////

          let responsiveStyleNeedsUpdate = false;
          for (let query in newResponsiveStyles) {
            responsiveStyleCache[query] = responsiveStyleCache[query] || '';
            responsiveStyleCache[query] += `${newResponsiveStyles[query]}`;
            responsiveStyleNeedsUpdate = true;
          }
          if (responsiveStyleNeedsUpdate) {
            let result = '';
            let orderedStyles = [];
            for (let query in responsiveStyleCache) {
              orderedStyles.push(query);
            }
            orderedStyles.sort((a, b) => {
              let orderA = Number(a.replace(/^([^px]+).*/, (x, y) => y));
              let orderB = Number(b.replace(/^([^px]+).*/, (x, y) => y));
              return orderA < orderB ? -1 : 1;
            });
            orderedStyles.forEach(q => {
              result += `@media ${q} { ${responsiveStyleCache[q]} }`;
            });
            responsiveStyle.innerHTML = result;
          }
          if (newHelperStyles != '') {
            helperStyle.innerHTML += newHelperStyles;
          }
          if (newStyles != '') {
            style.innerHTML += newStyles;
          }
          ///////////////////////////////////////////////////////////////////
          ///////////////////////////////////////////////////////////////////
          ///////////////////////////////////////////////////////////////////
          ///////////////////////////////////////////////////////////////////
        }

        // could pass in an array of specific stylesheets for optimization
        function getAllCSSVariableNames() {
          let styleSheets = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.styleSheets;
          var cssVars = [];
          // loop each stylesheet
          for (var i = 0; i < styleSheets.length; i++) {
            // loop stylesheet's cssRules
            try {
              // try/catch used because 'hasOwnProperty' doesn't work
              for (var j = 0; j < styleSheets[i].cssRules.length; j++) {
                try {
                  // loop stylesheet's cssRules' style (property names)
                  for (var k = 0; k < styleSheets[i].cssRules[j].style.length; k++) {
                    let name = styleSheets[i].cssRules[j].style[k];
                    // test name for css variable signiture and uniqueness
                    if (name.startsWith('--') && cssVars.indexOf(name) == -1) {
                      cssVars.push(name);
                    }
                  }
                } catch (error) {}
              }
            } catch (error) {}
          }
          return cssVars;
        }
        let queueList = [];
        let compCache = {};
        let computedStyle = getComputedStyle(document.documentElement);

        // wordpress admin will move the style from :root to editor-styles-wrapper class
        let editorComputedStyle = false;
        if (document.querySelector('.editor-styles-wrapper')) {
          editorComputedStyle = getComputedStyle(document.querySelector('.editor-styles-wrapper'));
        }

        // if (true) {
        //     let allstyles = '';
        //     for (let i=0; i<document.styleSheets.length; i++) {
        //         for (let j=0; j<document.styleSheets[i].cssRules.length; j++) {
        //             allstyles += document.styleSheets[i].cssRules[j].cssText ;
        //         }
        //     }
        //     allstyles.replace(/(\-\-[^\:]+)\:([^;]+)\;/g, (a,b,c,d)=> {
        //         console.log('COMP_CACHE', c);
        //         // compCache[b.trim()] = c;
        //     });
        // }

        let cssVariables = getAllCSSVariableNames();
        cssVariables.forEach(name => {
          compCache[name] = editorComputedStyle ? editorComputedStyle?.getPropertyValue(name) : computedStyle.getPropertyValue(name);
          editorComputedStyle && console.log('Utilitycsss / editorComputedStyle', name, ':', compCache[name]);
        });
        function updateComputedStyle() {
          computedStyle = getComputedStyle(document.documentElement);
          let cssVariables = getAllCSSVariableNames();
          cssVariables.forEach(name => {
            compCache[name] = computedStyle.getPropertyValue(name);
            console.log('Utilitycsss / compCache', name, ':', computedStyle.getPropertyValue(name));
          });
        }
        window.updateComputedStyle = updateComputedStyle;
        function getComputedCache() {
          return compCache;
        }
        window.getComputedCache = getComputedCache;
        function resolveParse() {
          requestAnimationFrame(resolveParse);
          if (queueList.length > 0) {
            queueList.forEach(node => {
              parse(node, compCache);
            });
          }
          queueList = [];
        }
        function addToParseQueue(node) {
          let hasNode = false;
          queueList.forEach(queueNode => {
            if (node == queueNode) hasNode = true;
          });
          if (!hasNode) {
            queueList.push(node);
          }
        }
        requestAnimationFrame(resolveParse);

        /**
         * parse the provded node and generates utility classes if needed
         * @param {HTMLElement} el 
         */
        function getCSSClasses(el) {
          if (el.matches && el.matches(selector)) {
            addToParseQueue(el);
          }
          el.querySelectorAll && el.querySelectorAll(selector).forEach(o => {
            addToParseQueue(o);
          });
        }
        let resizeTimer;
        function onResize() {
          clearTimeout(resizeTimer);
          resizeTimer = setTimeout(() => {
            document.documentElement.style.setProperty('--vhfix', window.innerHeight + "px");
            document.documentElement.style.setProperty('--vw', document.body.clientWidth - 1 + "px");
            document.documentElement.style.setProperty('--vhfixonce', window.innerHeight + "px");
            getCSSClasses(document.documentElement);
          }, 10);
        }
        window.addEventListener('resize', onResize);
        onResize();
        document.documentElement.style.setProperty('--vw', document.body.clientWidth - 1 + "px");
        document.addEventListener('DOMContentLoaded', event => {
          onResize();
          document.documentElement.style.setProperty('--vw', document.body.clientWidth - 1 + "px");
        });
        window.addEventListener('load', event => {
          onResize();
          document.documentElement.style.setProperty('--vw', document.body.clientWidth - 1 + "px");
        });
        new ResizeObserver(function () {
          onResize();
        }).observe(document.body);
        var dom_observer = new MutationObserver(function (mutations) {
          mutations.forEach(mutation => {
            if (mutation.type == 'childList' && mutation.target.tagName != 'STYLE') {
              mutation.addedNodes.forEach(node => {
                getCSSClasses(node);
              });
            }
            if (mutation.type == 'attributes') {
              if (mutation.target.___oldClassName__ === mutation.target.className) ; else {
                mutation.target.___oldClassName__ = mutation.target.className;
                getCSSClasses(mutation.target);
              }
            }
          });
        });
        dom_observer.observe(document.documentElement || document.body, {
          attributes: true,
          attributeFilter: ['class'],
          subtree: true,
          childList: true,
          characterData: true
        });
        getCSSClasses(document.documentElement || document.body);
        window.UtilityCSS = () => {
          return helperStyle.innerHTML + '\n' + aliasStyle.innerHTML + '\n' + style.innerHTML + '\n' + responsiveStyle.innerHTML;
        };
        window.getAllCSSVariableNames = getAllCSSVariableNames;
      }
    })();

    /**
        * JavaScript port of Webkit implementation of CSS cubic-bezier(p1x.p1y,p2x,p2y) by http://mck.me
        * http://svn.webkit.org/repository/webkit/trunk/Source/WebCore/platform/graphics/UnitBezier.h
        */
    var CubicBezier = (function () {
      var DEFAULT_DURATION = 400; //ms

      var solveEpsilon = function (duration) {
        return 1.0 / (200.0 * duration);
      };
      var unitBezier = function (p1x, p1y, p2x, p2y) {
        var cx = 3.0 * p1x;
        var bx = 3.0 * (p2x - p1x) - cx;
        var ax = 1.0 - cx - bx;
        var cy = 3.0 * p1y;
        var by = 3.0 * (p2y - p1y) - cy;
        var ay = 1.0 - cy - by;
        var sampleCurveX = function (t) {
          return ((ax * t + bx) * t + cx) * t;
        };
        var sampleCurveY = function (t) {
          return ((ay * t + by) * t + cy) * t;
        };
        var sampleCurveDerivativeX = function (t) {
          return (3.0 * ax * t + 2.0 * bx) * t + cx;
        };
        var solveCurveX = function (x, epsilon) {
          var t0, t1, t2, x2, d2, i;
          for (t2 = x, i = 0; i < 8; i++) {
            x2 = sampleCurveX(t2) - x;
            if (Math.abs(x2) < epsilon) {
              return t2;
            }
            d2 = sampleCurveDerivativeX(t2);
            if (Math.abs(d2) < 1e-6) {
              break;
            }
            t2 = t2 - x2 / d2;
          }
          t0 = 0.0;
          t1 = 1.0;
          t2 = x;
          if (t2 < t0) return t0;
          if (t2 > t1) return t1;
          while (t0 < t1) {
            x2 = sampleCurveX(t2);
            if (Math.abs(x2 - x) < epsilon) {
              return t2;
            }
            if (x > x2) {
              t0 = t2;
            } else {
              t1 = t2;
            }
            t2 = (t1 - t0) * 0.5 + t0;
          }

          // Failure.
          return t2;
        };
        var solve = function (x, epsilon) {
          return sampleCurveY(solveCurveX(x, epsilon));
        };
        return function (x, duration) {
          return solve(x, solveEpsilon(+duration || DEFAULT_DURATION));
        };
      };
      return function (p1x, p1y, p2x, p2y, x, duration) {
        return unitBezier(p1x, p1y, p2x, p2y)(x, duration);
      };
    })();

    var isPlaying = false;
    var rafQueue = [];
    function removeFromRaf(animation) {
      for (let i = 0; i < rafQueue.length; i++) {
        if (rafQueue[i] == animation) {
          rafQueue.splice(i, 1);
          break;
        }
      }
    }
    function addToRaf(animation) {
      let isInRaf = false;
      rafQueue.forEach(anim => {
        if (anim == animation) {
          isInRaf = true;
        }
      });
      if (!isInRaf) {
        rafQueue.push(animation);
      }
    }
    function update() {
      requestAnimationFrame(update);
      rafQueue.forEach(anim => {
        anim && anim.update();
      });
    }
    class WebAnimation {
      constructor(options) {
        this.step = options.step || function () {};
        this.end = options.end || function () {};
        this.direction = options.direction || 1;
        this.duration = options.duration || 1000;
        this.easing = options.easing || [0.550, 0.085, 0.680, 0.530];
        this.delay = options.delay || 0;
        this._progress = 0;
        this._easedProgress = 0;
      }
      destroy() {
        removeFromRaf(this);
      }
      play() {
        this.delayProgress = 0;
        this._progress = this.direction == 1 ? 0 : 1;
        this._easedProgress = this.direction == 1 ? 0 : 1;
        this.isPlaying = true;
        addToRaf(this);
        if (!isPlaying) {
          isPlaying = true;
          update();
        }
      }
      pause() {
        clearTimeout(this._delayTimer);
        this.isPlaying = false;
      }
      reset() {
        this._progress = 0;
      }
      update() {
        if (this.isPlaying) {
          if (this.delayProgress < this.delay) {
            this.delayProgress += 1000 / 60;
            return;
          }
          this._progress += 1 / (this.duration / (1000 / 60)) * this.direction;
          this._easedProgress = CubicBezier(this.easing[0], this.easing[1], this.easing[2], this.easing[3], Math.max(0, Math.min(1, this._progress)), 1);
          if (this.direction == 1 && this._easedProgress < 1 || this.direction == -1 && this._easedProgress > 0) {
            this.step(this._easedProgress, this._progress);
          } else {
            this.isPlaying = false;
            this._progress = this.direction == 1 ? 1 : 0;
            this._easedProgress = this.direction == 1 ? 1 : 0;
            this.step(this._easedProgress, this._progress);
            this.end();
          }
        }
      }
    }

    function tween(obj, options) {
      options = options || {};
      if (typeof options.to === void 0) {
        throw obj;
      }
      let startValues = {};
      for (let k in options.to) {
        startValues[k] = obj[k];
      }
      let t = new WebAnimation({
        step: e => {
          for (let k in options.to) {
            obj[k] = startValues[k] + (options.to[k] - startValues[k]) * e;
          }
          options.step && options.step(e);
        },
        end: options.end,
        delay: options.delay * 1000,
        duration: options.duration * 1000,
        easing: options.easing
      });
      t.play();
      return t;
    }

    function getPosition(node, scope) {
      const root = scope || document;
      const width = node.clientWidth;
      const height = node.clientHeight;
      let offsetTop = node.offsetTop;
      let offsetLeft = node.offsetLeft;
      while (node && node.offsetParent && node.offsetParent != document && node !== root && root !== node.offsetParent) {
        offsetTop += node.offsetParent.offsetTop;
        offsetLeft += node.offsetParent.offsetLeft;
        node = node.offsetParent;
      }
      return {
        top: offsetTop,
        left: offsetLeft,
        width,
        height
      };
    }
    class CoreDrag {
      constructor(el) {
        this.el = el;
        this.el.style.display = 'block';
        this.data = {
          debug: false,
          offset: 0,
          active: true,
          autoplayPosition: 0,
          content: null,
          currentIndex: 0,
          scroll: 0,
          position: [0, 0],
          cursor: [0, 0],
          prevent: false,
          direction: 'x',
          handlerPosition: [0, 0],
          showBar: false,
          swipe: false,
          desktopOnly: false,
          loop: true,
          //this.el.getAttribute('loop') == "false" ? false : this.el.hasAttribute('loop') ? true : false,
          autoplay: true //this.el.getAttribute('autoplay') == "false" ? false : this.el.hasAttribute('autoplay') ? true : false,
        };

        this.lastDate = this.lastDate || performance.now();
        this.speed = 0;
        this.speedX = 0;
        this._steps = [];
        this.next = this.next.bind(this);
        this.prev = this.prev.bind(this);
        this._onPointerDown = this._onPointerDown.bind(this);
        this._onPointerMove = this._onPointerMove.bind(this);
        this._onPointerUp = this._onPointerUp.bind(this);
        this.toggleAutoPlay = this.toggleAutoPlay.bind(this);
        this.toggleAutoPlayPrevent = this.toggleAutoPlayPrevent.bind(this);
        this.offset = 0;
        this.isPointerDown = false;
        this._pointerDown = [0, 0];
        this._pointer = [0, 0];
        this._handlerPosition = [0, 0];
        this._positionDown = [0, 0];
        this._position = [0, 0];
        this._dragPosition = [0, 0];
        this._cursor = [0, 0];
        this._accX = 0;
        this._accY = 0;
        this._direction = 1;
        this.$layers = this.el.querySelectorAll('[drag-layer]');
        if (this.$layers.length > 0 && !this.hasResizedOnce) {
          this.hasResizedOnce = true;
          this.resize();
        }
        this.el.addEventListener('mousedown', this._onPointerDown, {
          passive: false
        });
        this.el.addEventListener('touchstart', this._onPointerDown, {
          passive: false
        });
        document.addEventListener('mousemove', this._onPointerMove, {
          passive: false
        });
        document.addEventListener('touchmove', this._onPointerMove, {
          passive: false
        });
        document.addEventListener('mouseup', this._onPointerUp, {
          passive: false
        });
        document.addEventListener('touchend', this._onPointerUp, {
          passive: false
        });
        this.$content = this.el.querySelector('[drag-content], [data-drag-content]');
        const resizeObserver = new ResizeObserver(entries => {
          this.resize();
        });
        resizeObserver.observe(this.$content);
        this.$layers = this.el.querySelectorAll('[drag-layer]');
        this._steps = [];
        this.el.querySelectorAll('[drag-step], [data-drag-step]').forEach(el => {
          this._steps.push({
            el
          });
        });
        this.$content.style.overflowX = 'visible';
        this.$content.style.userSelect = 'none';
        if (this.data.active) {
          this.$content.style.cursor = 'grab';
        }
        this.$nextBtn = this.el.querySelectorAll('[data-drag-next], [drag-next]');
        this.$nextBtn.forEach(el => {
          el.removeEventListener('click', this.next);
          el.addEventListener('click', this.next);
        });
        this.$prevBtn = this.el.querySelectorAll('[data-drag-prev], [drag-prev]');
        this.$prevBtn.forEach(el => {
          el.removeEventListener('click', this.prev);
          el.addEventListener('click', this.prev);
        });
        this.$playBtn = this.el.querySelectorAll('[data-drag-playpause], [drag-playpause]');
        this.$playBtn.forEach(el => {
          el.removeEventListener('mousedown', this.toggleAutoPlayPrevent);
          el.addEventListener('mousedown', this.toggleAutoPlayPrevent);
        });
        this.$playBtn.forEach(el => {
          el.removeEventListener('click', this.toggleAutoPlay);
          el.addEventListener('click', this.toggleAutoPlay);
        });
        this.$scrollbarHandle = this.el.querySelector('[data-drag-scrollbar-handle]');
        this.resize();
        setTimeout(() => {
          this.resize();
        }, 1000);
      }
      prev() {
        // this.data.currentIndex -= 1;
        // this.data.currentIndex = Math.max( 0, this.data.currentIndex )
        // this.onCurrentIndexChange()
        this._scrollTween = tween(this._position, {
          to: {
            0: this._position[0] + this._steps[0].width // + this._steps[0].left,//Math.max( -this._contentWidth+this._width, this._steps[this.data.currentIndex].left*-1 + this._steps[0].left) ,
          },

          duration: 0.6,
          easing: [0.49, 0.01, 0.27, 1]
        });
      }
      next() {
        // this.data.currentIndex += 1;
        // this.data.currentIndex = Math.min( this._steps.length-1, this.data.currentIndex )
        // this.onCurrentIndexChange()
        this._scrollTween = tween(this._position, {
          to: {
            0: this._position[0] - this._steps[0].width // + this._steps[0].left,//Math.max( -this._contentWidth+this._width, this._steps[this.data.currentIndex].left*-1 + this._steps[0].left) ,
          },

          duration: 0.6,
          easing: [0.49, 0.01, 0.27, 1]
        });
      }
      onCurrentIndexChange() {

        // if (this.data.currentIndex > this._steps.length-1) {
        //     this.data.currentIndex = 0;//this._steps.length-1
        // }
        // if (this.data.currentIndex < 0) {
        //     this.data.currentIndex = this._steps.length-1
        // }
        // if (!this._steps[this.data.currentIndex]) {
        //     return;
        // }
        // console.log('onCurrentIndexChange', this.data.currentIndex, this._steps[this.data.currentIndex].left * -1)
      }
      _onPointerDown(event) {
        this.speedX = 0;
        this.lastDate = performance.now();
        this.isPointerDown = true;
        this.preventClick = false;
        let touchEvent = event.touches || event.changedTouches ? event.touches[0] || event.changedTouches[0] : event;
        let touchEventPageX = touchEvent.pageX;
        let touchEventPageY = touchEvent.pageY;
        touchEventPageX -= window.pageXOffset || document.documentElement.scrollLeft;
        touchEventPageY -= window.pageYOffset || document.documentElement.scrollTop;
        this.lastTouchEventPageX = touchEventPageX;
        this._accX = 0;
        this._accY = 0;
        this._pointerDown[0] = touchEventPageX;
        this._pointerDown[1] = touchEventPageY;
        this._positionDown[0] = this._position[0];
        this._positionDown[1] = this._position[1];
        this._lastMoveX = this._pointerDown[0];
        this._lastMoveY = this._pointerDown[1];
        this.isPointerDown = true;
        if (this.data.active) {
          this.$content.style.cursor = 'grabbing';
        }
        this.isDeccelerating = false;
        this.lastDate = performance.now();
      }
      toggleAutoPlayPrevent(e) {
        this.isToggleBtn = true;
        console.log('toggleAutoPlayPrevent');
      }
      toggleAutoPlay(e) {
        this.data.autoplay = !this.data.autoplay;
        this.el.classList[this.data.autoplay ? 'remove' : 'add']('is-paused');
        console.log('toggleAutoPlay', this.data.autoplay);
      }
      _onHandlerDown() {
        this.isHanlderDown = true;
      }
      _onPointerMove(event) {
        let touchEvent = event.touches || event.changedTouches ? event.touches[0] || event.changedTouches[0] : event;
        let touchEventPageX = touchEvent.pageX;
        let touchEventPageY = touchEvent.pageY;
        touchEventPageX -= window.pageXOffset || document.documentElement.scrollLeft;
        touchEventPageY -= window.pageYOffset || document.documentElement.scrollTop;
        if (!this.isPointerDown) {
          return;
        }
        this.lastTouchEventPageX = this.lastTouchEventPageX || touchEventPageX;
        let diffX = touchEventPageX - this.lastTouchEventPageX; //_pointerDown[0]
        touchEventPageY - this.lastTouchEventPageY; //_pointerDown[1]

        this.lastTouchEventPageX = touchEventPageX;
        if (!this.isHanlderDown) {
          this._accX += Math.abs(this._lastMoveX - touchEventPageX);
          this._accY += Math.abs(this._lastMoveY - touchEventPageY);
          this._lastMoveX = touchEventPageX;
          this._lastMoveY = touchEventPageY;
          if (this.data.direction == 'y') {
            event.preventDefault();
            event.stopPropagation();
          }
          if (Math.abs(this._accX) > 5 && Math.abs(this._accX) > Math.abs(this._accY) && this.data.direction == 'x' || Math.abs(this._accY) > 5 && Math.abs(this._accY) > Math.abs(this._accX) && this.data.direction == 'y' || this.preventClick) {
            this.preventClick = true;
            window.preventClick = true;
            console.log('SET window.preventClick = true');
            this.lastDate = this.lastDate || performance.now();
            const timeDiff = performance.now() - this.lastDate;
            this.speedX = diffX / (timeDiff + 0.001);
            this.speedX = Math.min(10, Math.max(-10, this.speedX));
            this.lastDate = performance.now();
            this.layers && this.layers.forEach((layer, i) => {
              layer.el.querySelectorAll('a').forEach(a => a.style.pointerEvents = 'none');
            });
          }
        }

        //stop autoscroll for desktop
        if (!event.touches && !event.changedTouches) {
          console.log('STOP AUTPLAY');
          this.data.autoplay = false;
          this.el.classList[this.data.autoplay ? 'remove' : 'add']('is-paused');
        }
      }
      _onPointerUp(event) {
        //stop autoscroll for desktop

        this.isHanlderDown = false;
        if (!this.isPointerDown) {
          this.isToggleBtn = false;
          return true;
        }
        if (!event.touches && !event.changedTouches && !this.isToggleBtn) {
          console.log('STOP AUTPLAY');
          this.data.autoplay = false;
          this.el.classList[this.data.autoplay ? 'remove' : 'add']('is-paused');
        }
        this.isToggleBtn = false;
        if (this.preventClick) {
          console.log('_onPointerUp', 'preventClick ? ' + this.preventClick);
          event.preventDefault();
          event.stopPropagation();
          setTimeout(() => {
            this.data.prevent = false;
            this.isPointerDown = false;
            this.preventClick = false;
            this.layers && this.layers.forEach((layer, i) => {
              layer.el.querySelectorAll('a').forEach(a => a.style.pointerEvents = 'auto');
            });
          }, 200);
        } else {
          this.preventClick = false;
        }
        if (this.data.active) {
          this.$content.style.cursor = 'grab';
        }
        this.isDeccelerating = true;
        this.isPointerDown = false;
        this.isPointerDown = false;
        setTimeout(() => {
          requestAnimationFrame(() => {
            console.log('SET window.preventClick = false');
            window.preventClick = false;
          });
        }, 10);
      }
      resize() {
        this._scrollTween && this._scrollTween?.destroy();
        if (window.innerWidth <= 600) {
          return;
        }
        if (!this.$content) return;
        if (!this.layers || this.layers.length == 0) {
          this.layers = [];
          this.$layers = this.el.querySelectorAll('[drag-layer]');
          this.$layers.forEach((el, i) => {
            this.layers.push({
              el,
              x: 0,
              offset: 0,
              ratio: 0,
              width: el.clientWidth,
              left: el.offsetLeft
            });
            if (!el.hasAttribute('data-src')) {
              this.layers[i].loaded = true;
            } else {
              let img = new Image();
              img.onload = () => {
                this.layers[i].loaded = true;
                this.layers[i].width = el.clientWidth;
                setTimeout(() => {
                  this.resize();
                }, 300);
              };
              img.onerror = () => {
                this.layers[i].error = true;
              };
              img.src = el.getAttribute('data-src');
            }
          });
        } else {
          this.layers.forEach((layer, i) => {
            layer.width = layer.el.clientWidth;
            layer.left = layer.el.offsetLeft;
            layer.offset = 0;
          });
        }
        this.data.position[0] = 0;
        this._position[0] = 0;
        this._width = this.el.clientWidth;
        this._height = this.el.clientHeight;
        this._contentWidth = this.$content.scrollWidth * (this.el.hasAttribute('data-trim') ? Number(this.el.getAttribute('data-trim')) : 1);
        this._contentHeight = this.$content.scrollHeight;
        let bounds = getPosition(this.el);
        this._left = bounds.left;
        this._top = bounds.top;
        if (this.$content) {
          let bounds = getPosition(this.$content);
          this._contentLeft = bounds.left;
        }
        for (let i = 0; i < this._steps.length; i++) {
          this._steps[i].width = this._steps[i].el.clientWidth;
          this._steps[i].left = getPosition(this._steps[i].el).left; //.offsetLeft
        }

        if (this._steps.length > 1) {
          const prevStep = this._steps.length - 2;
          const lastStep = this._steps.length - 1;
          let space = this._steps[lastStep].left - (this._steps[prevStep].left + this._steps[prevStep].width);
          this._scrollWidth = this._steps[lastStep].left + this._steps[lastStep].width + space;
        }
      }
      update() {
        if (window.innerWidth <= 600) {
          this.layers && this.layers.forEach((layer, i) => {
            layer.el.style.transform = 'none';
          });
          this.isDeccelerating = false;
          return;
        }
        if (!this.data.active) {
          return;
        }
        if (this.data.active) {
          this.$content.style.cursor = 'grab';
        }
        if (this._steps && this._steps.length > 0) {
          if (this._steps.length > 0) {
            let isFirst = this._position[0] > -10;
            this.$prevBtn?.forEach(el => {
              if (isFirst && !el.classList.contains('is-disabled')) el.classList.add('is-disabled');
              if (!isFirst && el.classList.contains('is-disabled')) el.classList.remove('is-disabled');
            });
            let isLast = this._steps[this._steps.length - 1].left + this._steps[this._steps.length - 1].width + this._position[0] <= this._left + this._width;
            this.$nextBtn?.forEach(el => el.classList[isLast ? 'add' : 'remove']('is-disabled'));
          }
        }

        // this.lastDate =  this.lastDate || performance.now()
        this._position[0] += this.speedX * 17;
        this.speedX *= 0.96;
        if (this.speedX < 0.01) {
          this.isDeccelerating = false;
        }
        if (this.data.autoplay && !this.isPointerDown && !this.isDeccelerating) {
          this._position[0] -= 0.4;
          if (!this.data.loop) {
            this._position[0] = Math.min(0, Math.max(-this._contentWidth + this._width, this._position[0]));
          }
        }
        this.data.position[0] += (this.data.offset * this._contentWidth + this._position[0] - this.data.position[0]) * 1;
        if (!this.data.loop) {
          this._position[0] = Math.min(0, Math.max(-this._contentWidth + this._width, this._position[0]));
          this._position[1] = Math.min(0, Math.max(-this._contentHeight + this._height, this._position[1]));
        }
        this.data.cursor[0] += (this._cursor[0] - this.data.cursor[0]) * 0.5;
        this.data.cursor[1] += (this._cursor[1] - this.data.cursor[1]) * 0.5;
        this.data.position[0];
        this.layers && this.layers.forEach((layer, i) => {
          if (this.data.loop) {
            if ( /*this.offset +*/this.data.position[0] + layer.left + layer.offset < -layer.width) {
              layer.offset += this._scrollWidth;
            }
            if ( /*this.offset +*/this.data.position[0] + layer.left + layer.offset > this._width) {
              layer.offset -= this._scrollWidth;
            }
          }
          let x = /*this.offset +*/this.data.position[0] + layer.offset;
          layer.el.style.transform = 'translate(' + x + 'px, ' + this.data.position[1] + 'px) translateZ(0)';
        });
        if (this.$scrollbarHandle) {
          this.$scrollbarHandle.style.transform = `translateX(${this.data.position[0] / (-this._contentWidth + this._width) % 1 * 100}%) translateZ(0)`;
        }
      }
    }

    // Core drag module
    function onReady$5() {
      if (window.innerWidth > 600) {
        console.log('CoreDrag.js');
        const coreDrags = [];
        const $coreDrags = document.querySelectorAll('[core-drag]');
        $coreDrags?.forEach($coreDrag => {
          coreDrags.push(new CoreDrag($coreDrag));
        });
        function onResize() {
          coreDrags.forEach(coreDrag => coreDrag.resize());
        }
        function render() {
          requestAnimationFrame(render);
          coreDrags.forEach(coreDrag => coreDrag.update());
        }
        window.addEventListener('resize', onResize);
        onResize();
        requestAnimationFrame(render);
      }
    }
    if (document.readyState === 'complete') {
      onReady$5();
    } else {
      window.addEventListener("DOMContentLoaded", onReady$5);
    }

    function replaceTags(str) {
      return str?.trim()

      // ?.replace('{spacer}',  '<span style="height:1em; width:2em;display:inline-block;"></span>')
      ?.replace('{br}', '')?.replace(/\{a\_start([^\}]*)\}/g, (a, b, c) => {
        const href = b.replace('|href=', '')?.replace(/\"/g, '');
        return `<a href="${href}">`;
      })?.replace(/{(sub|small|strong|b|u|i|sup|em)\_start}/, '<$1>')?.replace(/{(sub|small|strong|b|u|i|sup|em|a)\_end}/, '</$1>');
    }
    class SplitText extends HTMLElement {
      constructor() {
        super();
        this.data = {
          content: 'Lorem Ipsum',
          progress: 0,
          delay: 0,
          lines: [],
          duration: 1.6,
          lineDelay: 0.07,
          css: '',
          indent: false
        };
        this.el = this;
        this.attachShadow({
          mode: "open"
        });
        this.onSlotchange = this.onSlotchange.bind(this);
        this.resize = this.resize.bind(this);
        this.intersectionObserver = new IntersectionObserver(entries => {
          entries?.forEach(el => {
            if (el.isIntersecting) {
              this.show();
            } else {
              this.hide();
            }
          });
        });
      }
      onSlotchange(e) {
        let childNodes = e.target.assignedNodes({
          flatten: true
        });
        this.slotNodes = childNodes;
        if (childNodes.length == 0) return;
        requestAnimationFrame(() => {
          this.resize();
        });
      }
      connectedCallback() {
        this.data.delay = Number(this.getAttribute('data-delay'));
        this.data.css = this.getAttribute('css') || '';
        this.data.indent = this.getAttribute('indent') && this.getAttribute('indent') == 'true' ? true : false;
        this.style.display = 'block';
        this.style.position = 'relative';
        this.style.width = '100%';
        this.shadowRoot.innerHTML = `
    
            <style>${this.data.css + `
            a {
                text-decoration: none;
                color: inherit;
                font-weight: bold;
            }`}</style>
    
            <div original-text style="opacity: 0;">
                <slot></slot>
            </div>

            <div placeholder-text x-ref  style="ointer-events: none; opacity: 0; position: absolute; top:0; left: 0; white-space: nowrap;">
            </div>
            <div multiline-text  x-lines  aria-hidden="true" style="pointer-events: none; position: absolute; top:0; left: 0; width: 100%;">
            </div>
            `;
        this.$slot = this.shadowRoot.querySelector('slot');
        this.$slot.addEventListener('slotchange', this.onSlotchange);
        window.addEventListener('resize', this.resize);
        window.addEventListener('load', this.resize);
        this.resizeObserver = new ResizeObserver(e => {
          this.resize();
        });
        requestAnimationFrame(() => {
          this.resize();
          this.intersectionObserver.observe(this);
          this.resizeObserver.observe(this);
          this.resizeObserver.observe(document.body);
        });
      }
      disconnectedCallback() {
        window.removeEventListener('resize', this.resize);
        window.removeEventListener('load', this.resize);
      }
      resize() {
        this.$ref = this.$ref || this.shadowRoot.querySelector('[x-ref]');
        if (!this.$ref || !this.slotNodes) {
          return;
        }
        const fullText = this.el.innerHTML?.trim()?.replace(/\-/, '- ')?.replace(/\<(a)([^>]*)\>/g, (a, b, c, d) => {
          let attrs = c.split(' ');
          let attrsString = '';
          attrs.forEach(attr => {
            let parts = attr.split('=');
            if (parts[0].trim() == 'href') {
              attrsString += '|href=' + parts[1].trim();
            }
          });
          return ' {a_start' + attrsString + '} ';
        })?.replace(/\<(sup|sub|strong|i|em|a|u|small)[^>]*\>/g, ' {$1_start} ')?.replace(/\<\/(sup|sub|strong|i|em|a|u|small)\>/g, ' {$1_end} ')?.replace(/\<\/?br\>/g, ' {br} ')?.replace(/<[^>]*>?/gm, '')?.replace(/\s+/g, ' ');
        const textArr = fullText?.split(' ');
        this.$ref.innerHTML = ``;
        let lines = [];
        let lineStart = 0;
        let linePrefix = '';
        let isInTag = [];
        for (let i = 0; i < textArr.length; i++) {
          if (/\{a\_start/g.test(textArr[i]?.trim())) {
            textArr[i]?.trim()?.replace(/\{a\_start([^\}]*)\}/g, (a, b, c) => {
              const href = b.replace('|href=', '')?.replace(/\"/g, '');
              isInTag.push({
                tag: 'a',
                href
              });
            });
          }
          if (textArr[i]?.trim() === '{sub_start}') {
            isInTag.push({
              tag: 'sub'
            });
          }
          if (textArr[i]?.trim() === '{sub_end}') {
            isInTag.splice(isInTag.length - 1, 1);
          }
          if (textArr[i]?.trim() === '{a_end}') {
            isInTag.splice(isInTag.length - 1, 1);
          }
          if (textArr[i]?.trim() === '{small_start}') {
            isInTag.push({
              tag: 'small'
            });
          }
          if (textArr[i]?.trim() === '{small_end}') {
            isInTag.splice(isInTag.length - 1, 1);
          }
          if (textArr[i]?.trim() === '{strong_start}') {
            isInTag.push({
              tag: 'strong'
            });
          }
          if (textArr[i]?.trim() === '{strong_end}') {
            isInTag.splice(isInTag.length - 1, 1);
          }
          if (textArr[i]?.trim() === '{b_start}') {
            isInTag.push({
              tag: 'b'
            });
          }
          if (textArr[i]?.trim() === '{b_end}') {
            isInTag.splice(isInTag.length - 1, 1);
          }
          if (textArr[i]?.trim() === '{i_start}') {
            isInTag.push({
              tag: 'i'
            });
          }
          if (textArr[i]?.trim() === '{i_end}') {
            isInTag.splice(isInTag.length - 1, 1);
          }
          if (textArr[i]?.trim() === '{u_start}') {
            isInTag.push({
              tag: 'u'
            });
          }
          if (textArr[i]?.trim() === '{u_end}') {
            isInTag.splice(isInTag.length - 1, 1);
          }
          if (textArr[i]?.trim() === '{sup_start}') {
            isInTag.push({
              tag: 'sup'
            });
          }
          if (textArr[i]?.trim() === '{sup_end}') {
            isInTag.splice(isInTag.length - 1, 1);
          }
          if (textArr[i]?.trim() === '{em_start}') {
            isInTag.push({
              tag: 'em'
            });
          }
          if (textArr[i]?.trim() === '{em_end}') {
            isInTag.splice(isInTag.length - 1, 1);
          }
          this.$ref.innerHTML += replaceTags(textArr[i]) + (/\-$/.test(textArr[i].trim()) ? '' : ' ');
          if (this.$ref.clientWidth > this.clientWidth || textArr[i] === '{br}') {
            this.$ref.innerHTML = '';
            let lineContent = '';
            if (linePrefix != '') {
              lineContent += linePrefix;
              linePrefix = '';
            }
            for (let u = lineStart; u < i; u++) {
              lineContent += replaceTags(textArr[u]) + (/\-$/.test(textArr[u].trim()) ? '' : ' ');
            }
            if (isInTag.length > 0) {
              for (let j = isInTag.length - 1; j >= 0; j--) {
                lineContent += `</${isInTag[j].tag}>`;
              }
              for (let j = 0; j < isInTag.length; j++) {
                linePrefix += `<${isInTag[j].tag} ${isInTag[j].href ? 'href="' + isInTag[j].href + '"' : ''}>`;
              }
            }
            lines.push(lineContent);
            lineStart = i;
            this.$ref.innerHTML = textArr[i] === '{br}' ? '' : replaceTags(textArr[i]);
          }
        }
        if (Math.abs(textArr.length - lineStart) > 0) {
          this.$ref.innerHTML = '';
          let lineContent = linePrefix;
          for (let u = lineStart; u < textArr.length; u++) {
            lineContent += replaceTags(textArr[u]) + (/\-$/.test(textArr[u].trim()) ? '' : ' ');
          }
          if (isInTag.length > 0) {
            for (let j = isInTag.length - 1; j >= 0; j--) {
              lineContent += `</${isInTag[j].tag}>`;
            }
          }
          lines.push(lineContent);
        }
        this.$ref.innerHTML = ``;
        this.$linewWrapper = this.$linewWrapper || this.shadowRoot.querySelector('[x-lines]');
        const multilines = lines.map((lineText, i) => {
          return `
                <span data-line-wrap style="position:relative; vertical-align: top; display: inline-block; white-space: nowrap;">
                    <span style="display: block; opacity: 0;">
                        ${lineText}
                    </span>
                    <span style="display:block; top: 50%; position:absolute; transform: translate3d(0, -50%, 0); overflow:hidden; ">
                        <span data-line style="display: block; transform: translate3d(0, 100%, 0); padding: 0.3em 0;">
                            ${lineText}
                        </span>
                    </span>
                </span><br/>`;
        }).join('');
        this.$linewWrapper.innerHTML = multilines;
        this.$lines = this.shadowRoot.querySelectorAll('[data-line]');
        this.$linesWrap = this.shadowRoot.querySelectorAll('[data-line-wrap]');
        this.$clonedLinks = this.$linewWrapper.querySelectorAll('a');
        this.$links = [];
        this.slotNodes.forEach(el => {
          if (el.querySelectorAll) {
            el.querySelectorAll('a').forEach(link => this.$links.push(link));
          }
        });
        this.$links.forEach(el => {
          el.addEventListener('mouseenter', e => {
            const href = el.getAttribute('href');
            this.$clonedLinks.forEach(el2 => {
              if (el2.getAttribute('href') == href) {
                el2.classList.add('hover');
              }
            });
          });
          el.addEventListener('mouseleave', e => {
            const href = el.getAttribute('href');
            this.$clonedLinks.forEach(el2 => {
              if (el2.getAttribute('href') == href) {
                el2.classList.remove('hover');
              }
            });
          });
        });
        if (this.isShown) {
          // this.show();
          this.$linesWrap?.forEach((el, i) => {
            el.style.opacity = 1;
          });
          this.$lines?.forEach((el, i) => {
            el.style.transform = `translate3d(0,${0}%,0)`;
          });
        }
      }
      show() {
        if (!this.$linesWrap) {
          this.resize();
        }
        if (!this.$linesWrap) {
          return;
        }
        this.tween && this.tween.destroy();
        clearTimeout(this.showTimer);
        this.showTimer = setTimeout(() => {
          this.isShown = true;
        }, this.data.lines.length * this.data.lineDelay + this.data.duration);
        this.$linesWrap.forEach((el, i) => {
          el.style.opacity = 0;
        });
        this.$lines.forEach((el, i) => {
          el.style.transform = `translate3d(0,${100}%,0)`;
        });
        this.tween = tween({
          e: 0
        }, {
          to: {
            e: 1
          },
          delay: this.data.delay,
          easing: [0, 0, 1, 1],
          duration: this.data.lines.length * this.data.lineDelay + this.data.duration,
          step: e => {
            this.$linesWrap.forEach((el, i) => {
              el.style.opacity = 1;
            });
            this.$lines.forEach((el, i) => {
              let lineDuration = this.data.duration; // ms
              let totalDuration = this.$lines.length * this.data.lineDelay + lineDuration;
              let current = e * totalDuration;
              let localProgress = Math.min(1, Math.max(0, (current - this.data.lineDelay * i) / lineDuration));
              const ease = CubicBezier(0.430, 0.195, 0.020, 1.000, localProgress);
              el.style.opacity = 1;
              el.style.transform = `translate3d(0,${100 - 100 * ease}%,0)`;
            });
          }
        });
      }
      hide() {
        clearTimeout(this.showTimer);
        this.$linesWrap?.forEach((el, i) => {
          el.style.opacity = 0;
        });
        this.$lines?.forEach((el, i) => {
          el.style.transform = `translate3d(0,${100}%,0)`;
        });
        this.tween && this.tween.destroy();
        // this.tween = tween({e:1}, {
        //     to: { e: 0 },
        //     delay: 0,
        //     easing: [0,0,1,1],
        //     duration: (this.data.lines.length * this.data.lineDelay*1000) + this.data.duration*1000,
        // })
      }
    }

    if (!window.__is_server__) {
      customElements.define('split-text2', SplitText);
    }

    function onDomReady() {
      console.log('ScrollObject.js');
      if (window.acf) {
        console.log('[SCROLL-OBJECT-ACF]');
        function onReady() {
          const $scrollObjects = document.querySelectorAll('[scroll-object]');
          $scrollObjects.forEach(el => {
            if (!el.classList.contains('in-view')) {
              el.classList.add('in-view');
              el.hasInitAdmin = true;
              // el.querySelectorAll('split-text2')?.forEach( el => {
              //     if (typeof el?.show === 'function') {
              //         el?.show();
              //     }
              // })
              if (el.hasAttribute('data-scale')) {
                let scale = Number(el.getAttribute('data-scale'));
                el.style.setProperty('--scaleX', scale);
                el.style.setProperty('--scaleY', scale);
              }
            }
          });
        }
        window.acf.addAction(`render_block_preview`, onReady);
      } else {
        // Scroll Animations
        const $scrollObjects = document.querySelectorAll('[scroll-object]');
        function onIntersect(entries) {
          entries.forEach(el => {
            if (el.isIntersecting) {
              el.target.classList.add('in-view');
              // el.target.querySelectorAll('split-text2')?.forEach( el => {
              //     if (typeof el?.show === 'function') {
              //         el?.show();
              //     }
              // })
            } else {
              el.target.classList.remove('in-view');
              // el.target.querySelectorAll('split-text2')?.forEach( el => {
              //     if (typeof el?.show === 'function') {
              //         el?.hide();
              //     }
              // })
            }

            if (el.target.hasAttribute('data-scale')) {
              let scale = Number(el.target.getAttribute('data-scale'));
              if (el.isIntersecting) {
                el.target.style.setProperty('--scaleX', scale);
                el.target.style.setProperty('--scaleY', scale);
              } else {
                el.target.style.removeProperty('--scaleX');
                el.target.style.removeProperty('--scaleY');
              }
            }
          });
        }
        let observer = new IntersectionObserver(onIntersect); //, { rootMargin: `0px 0px ${window.innerHeight*-0.5}px 0px`});
        $scrollObjects.forEach(el => observer.observe(el));
      }
    }
    if (document.readyState === 'complete') {
      onDomReady();
    } else {
      window.addEventListener("DOMContentLoaded", onDomReady);
    }

    // function getPosition (node, scope) {
    //     const root = scope || document;
    //     const width = node.clientWidth
    //     const height = node.clientHeight
    //     let offsetTop  = node.offsetTop;
    //     let offsetLeft = node.offsetLeft;
    //     while (node && node.offsetParent && node.offsetParent != document && node !== root && root !== node.offsetParent ) {
    //         offsetTop += node.offsetParent.offsetTop;
    //         offsetLeft += node.offsetParent.offsetLeft;
    //         node = node.offsetParent;
    //     }
    //     return {
    //         top: offsetTop,
    //         left: offsetLeft,
    //         width, 
    //         height
    //     };
    // }
    // export default class ScrollObject extends HTMLElement {
    //     constructor() {
    //         super();
    //         this.intersectionObserver = new IntersectionObserver((entries)=>{
    //             entries.forEach((el)=>{
    //                 if (el.isIntersecting) {
    //                     el.target.classList.add('in-view')
    //                 }
    //                 else {
    //                     el.target.classList.remove('in-view')
    //                 }
    //             });
    //         });

    //         const noScale  = this.hasAttribute('no-scale')
    //         const parallax = this.hasAttribute('parallax');
    //         const offset   = Number(this.getAttribute('offset'))
    //         const ratio    = Number(this.getAttribute('ratio')) || 0.1

    //         this.data  = {
    //             darkTheme: false, 
    //             parallax,
    //             noScale, ratio, offset, 
    //             winH: 0, top: 0, left: 0, 
    //             width: 0, height: 0,
    //         }

    //         this.onScroll = this.onScroll.bind(this);
    //         this.onResize = this.onResize.bind(this);
    //         this.update   = this.update.bind(this);
    //         this._smoothedParallax = 0;
    //         this.__scrollTop  = 0;
    //     }
    //     connectedCallback() {
    //         this.isAttached = true
    //         this.intersectionObserver.observe(this);
    //         if (this.data.parallax || this.data.darkTheme) {
    //             document.addEventListener('scroll', this.onScroll);
    //             window.addEventListener('resize',   this.onResize);
    //             this.resizeObserver = new ResizeObserver(e => {
    //                 this.onResize()
    //             });
    //             this.resizeObserver.observe(this);
    //             this.resizeObserver.observe(document.body);
    //             this.update();
    //         }
    //     }
    //     disconnectedCallback() {
    //         this.isAttached = false
    //         this.intersectionObserver.unobserve(this);
    //         if (this.data.parallax || this.data.darkTheme) {
    //             document.removeEventListener('scroll', this.onScroll);
    //             window.removeEventListener('resize',   this.onResize);
    //             this.resizeObserver.unobserve(this);
    //             this.resizeObserver.unobserve(document.body);
    //         }
    //     }
    //     onScroll(e) {
    //         this.__scrollTop = window.pageYOffset
    //     }
    //     onResize() {
    //         if (this.data.parallax || this.data.darkTheme) {
    //             let {top, left, width, height} = getPosition(this)
    //             this.data.top    = top;
    //             this.data.left   = left;
    //             this.data.width  = width;
    //             this.data.height = height;
    //             this.data.winH   = window.innerHeight;
    //         }
    //     }
    //     update() {
    //         if (!this.isAttached) {
    //             return
    //         }
    //         requestAnimationFrame(this.update);
    //         if (this.data.parallax) {
    //             let {top, height, noScale, ratio, offset, winH} = this.data
    //             if ( top - this.__scrollTop < winH) {
    //                 let r = (top - (this.__scrollTop) + height + offset*winH) / (winH + height)
    //                 r = Math.min(1, Math.max(0, r));
    //                 this._smoothedParallax += ( ((r-0.5) * 2 * height * ratio) - this._smoothedParallax) * 0.2;
    //                 this.style.transform = `translateY(${ this._smoothedParallax }px) scale(${noScale?'1':'1.2'}) translateZ(0)`
    //             }
    //         }

    //     }
    // }
    // customElements.define('scroll-object', ScrollObject);

    if (document.readyState === 'complete') {
      onReady$4();
    } else {
      window.addEventListener("DOMContentLoaded", onReady$4);
    }
    function onReady$4() {
      console.log('Cards.js');
      // Hover card texts
      const $dragCardContent = document.querySelectorAll('[drag-card-content]');
      const fixTextHeight = () => {
        if (window.innerWidth < 600) {
          $dragCardContent.forEach(el => {
            el.style.removeProperty('--translateY');
          });
          return;
        }
        $dragCardContent.forEach(el => {
          resizeObserver.observe(el);
          const $text = el.querySelector('[drag-card-text]');
          el.style.setProperty('--translateY', `${$text.clientHeight + 20}px`);
        });
      };
      const resizeObserver = new ResizeObserver(entries => {
        fixTextHeight();
      });
      window.addEventListener('resize', fixTextHeight);
      fixTextHeight();
    }

    function openVideoPlayer(videoID) {
      const $iframeWrap = document.createElement('div');
      $iframeWrap.style.position = 'fixed';
      $iframeWrap.style.background = 'rgba(0,0,0,0.8)';
      $iframeWrap.style.top = 0;
      $iframeWrap.style.left = 0;
      $iframeWrap.style.width = '100%';
      $iframeWrap.style.height = '100vh';
      $iframeWrap.style.zIndex = 9999999999;
      $iframeWrap.style.display = 'flex';
      $iframeWrap.style.alignItems = 'center';
      $iframeWrap.style.justifyContent = 'center';
      document.body.appendChild($iframeWrap);
      let $content = document.createElement('div');
      $content.style.width = 640 + 'px';
      $content.style.height = 480 + 'px';
      if (window.innerWidth < 600) {
        $content.style.width = '100%';
        $content.style.height = '100vh';
      }
      $content.style.position = 'relative';
      $iframeWrap.appendChild($content);
      let $close = document.createElement('button');
      $close.style.position = 'absolute';
      $close.style.background = 'none';
      $close.style.border = 'none';
      $close.style.bottom = '100%';
      $close.style.fontSize = '0px';
      $close.style.right = 0;
      $close.style.padding = '5px';
      $close.setAttribute('aria-label', 'Close video player');
      $close.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="20px" height="20px"><path fill="#fff" d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"/></svg>`;
      if (window.innerWidth < 600) {
        $close.style.position = 'absolute';
        $close.style.border = 'none';
        $close.style.bottom = 'calc(100% - 50px)';
        $close.style.right = '10px';
        $close.style.padding = '10px';
        $close.style.background = '#fff';
        $close.style.borderRadius = '100px';
        $close.style.color = '#000';
        $close.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="20px" height="20px"><path fill="#000" d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"/></svg>`;
      }
      $close.addEventListener('click', () => {
        document.body.removeChild($iframeWrap);
        let savedScroll = window.pageYOffset;
        function onHashChange(e) {
          window.removeEventListener('hashchange', onHashChange);
          if (window.preventScroll) {
            console.log('window.preventScroll');
            e.preventDefault();
            window.scrollTo(0, savedScroll);
            window.preventScroll = false;
          }
        }
        window.addEventListener('hashchange', onHashChange);
        window.preventScroll = true;
        window.location.hash = '';
      });
      $content.appendChild($close);
      let $iframe = document.createElement('iframe');
      $iframe.style.width = '100%';
      $iframe.style.height = '100%';
      $iframe.setAttribute('frameborder', 0);
      $iframe.setAttribute('tabindex', 0);
      $iframe.setAttribute('allow', 'autoplay; fullscreen');
      $iframe.setAttribute('src', `https://www.youtube-nocookie.com/embed/${videoID}?autoplay=1&autohide=1&fs=1&modestbranding=1&showinfo=0&controls=2&autoplay=1&rel=0&theme=light&vq=hd720`);
      $content.appendChild($iframe);
      window.location.hash = '#video-' + videoID;
      requestAnimationFrame(() => {
        $iframe.focus();
      });
    }
    if (document.readyState === 'complete') {
      onReady$3();
    } else {
      window.addEventListener("DOMContentLoaded", onReady$3);
    }
    function onReady$3() {
      console.log('YoutubePlayer.js');
      const $players = document.querySelectorAll('[yt-player-btn]');
      $players.forEach($btn => {
        function initIframe(e) {
          console.log('INIT IFRAME', 'window.preventClick:' + window.preventClick);
          if (window.preventClick) {
            console.log('skipped video because of window.preventClick');
            return;
          }
          let videoID = e.currentTarget.getAttribute('yt-video-id');
          if (window.innerWidth < 600 && e.currentTarget.hasAttribute('yt-video-id-mobile')) {
            videoID = e.currentTarget.getAttribute('yt-video-id-mobile');
          }
          openVideoPlayer(videoID);
        }
        $btn.addEventListener('click', initIframe);
      });
      if (/\#video\-/.test(window.location.hash)) {
        openVideoPlayer(window.location.hash.replace('#video-', ''));
      }
    }

    function onReady$2() {
      // Background Fade Animation 
      if (window.acf) {
        let hasInitAdmin = false;
        function onReady() {
          if (hasInitAdmin) return;
          hasInitAdmin = true;
          const $bgFade = document.querySelectorAll('[data-bg-fade]');
          $bgFade.forEach(el => {
            el.style.backgroundColor = el.getAttribute('data-bg-fade');
            if (el.getAttribute('data-color-fade')) {
              el.style.color = el.getAttribute('data-color-fade');
            }
          });
        }
        window.acf.addAction(`render_block_preview`, onReady);
      } else {
        let hasChangedOnce = false;
        const $bgFade = document.querySelectorAll('[data-bg-fade]');
        let observer = new IntersectionObserver(onIntersect, {
          rootMargin: `0px 0px ${window.innerHeight * -0.5}px 0px`
        });
        const states = [];
        $bgFade.forEach((el, i) => {
          el._index = i;
          states.push({
            el,
            intersecting: false,
            i
          });
        });
        function onIntersect(entries) {
          entries.forEach(el => {
            document.body.classList.add('no-transition');
            if (hasChangedOnce) {
              document.body.style.transition = 'background-color 1.1s var(--alias-easeOut), color 1.1s var(--alias-easeOut)';
            }
            if (el.isIntersecting) {
              document.body.style.backgroundColor = el.target.getAttribute('data-bg-fade');
              if (el.target.getAttribute('data-color-fade')) {
                document.body.style.color = el.target.getAttribute('data-color-fade');
              } else {
                document.body.style.removeProperty('color');
              }
              states[el.target._index].intersecting = true;
            } else {
              states[el.target._index].intersecting = false;
              let lastIntersecting = -1;
              for (let i = 0; i < states.length; i++) {
                if (states[i].intersecting) {
                  lastIntersecting = i;
                }
              }
              if (lastIntersecting > -1) {
                let target = states[lastIntersecting].el;
                document.body.style.backgroundColor = target.getAttribute('data-bg-fade');
                if (target.getAttribute('data-color-fade')) {
                  document.body.style.color = target.getAttribute('data-color-fade');
                } else {
                  document.body.style.removeProperty('color');
                }
              } else {
                document.body.style.removeProperty('background-color');
                document.body.style.removeProperty('color');
              }
            }
          });
          hasChangedOnce = true;
        }
        $bgFade.forEach(el => observer.observe(el));
        window.addEventListener('resize', () => {
          $bgFade.forEach(el => observer.unobserve(el));
          observer = new IntersectionObserver(onIntersect, {
            rootMargin: `0px 0px ${window.innerHeight * -0.5}px 0px`
          });
          $bgFade.forEach(el => observer.observe(el));
        });
        $bgFade.forEach((el, i) => {
          el.style.backgroundColor = $bgFade[0].getAttribute('data-bg-fade');
          el.style.color = $bgFade[0].getAttribute('data-color-fade');
        });
        setTimeout(() => {
          $bgFade.forEach((el, i) => {
            el.style.removeProperty('background-color');
            el.style.removeProperty('color');
          });
        }, 1000);
      }
    }
    if (document.readyState === 'complete') {
      onReady$2();
    } else {
      window.addEventListener("DOMContentLoaded", onReady$2);
    }

    // Update fx units based on ACF preview block size

    function onReady$1() {
      console.log('Admin.js');
      function onAdminResize() {
        const contentWidth = document.querySelector('.acf-block-preview').clientWidth;
        document.documentElement.style.setProperty('--vw', contentWidth + "px");
        document.documentElement.style.setProperty('--vh', contentWidth * 0.625 + "px");
        document.documentElement.style.setProperty('--vhfix', contentWidth * 0.625 + "px");
        document.documentElement.style.setProperty('--unit-fxx', `calc( var(--vw) / 1920 )`);
        document.querySelectorAll('.acf-block-preview').forEach(el => {
          el.style.setProperty('--vw', contentWidth + "px");
          el.style.setProperty('--vh', contentWidth * 0.625 + "px");
          el.style.setProperty('--vhfix', contentWidth * 0.625 + "px");
          el.style.setProperty('--unit-fxx', "calc( var(--vw) / 1920 )");
        });
        document.querySelectorAll('[className]')?.forEach(element => {
          element.setAttribute('class', element.getAttribute('className'));
          element.removeAttribute('className');
        });
      }
      let hasInitAdmin = false;
      const adminInit = () => {
        const $ref = document.querySelector('.acf-block-preview');
        if (!$ref) {
          return;
        }
        if (!hasInitAdmin) {
          hasInitAdmin = true;
          new ResizeObserver(onAdminResize).observe($ref);
        }

        // window.acf.addAction('new_field', (field)=>{
        //     console.log('___NEW_FIELD_READY__', field);
        //     // add class to this field
        //     // field.$el.addClass('my-class');
        //     // add click event to this field's button
        //     // field.on('click', 'button', function( e ){
        //     //     e.preventDefault();
        //     //     alert('Special event');
        //     // });
        // });
        // acf.addAction('new_field/type=select', myCallback);          // image fields
        // acf.addAction('new_field/name=hero_image', myCallback);     // fields named "hero_image"
        // acf.addAction('new_field/key=field_123456', myCallback);    // field with key "field_123456"

        onAdminResize();
      };
      const addEyeDropper = target => {
        console.log('add eye dropper called', {
          target
        });
        if (!window.EyeDropper) {
          console.log("Your browser does not support the EyeDropper API");
        } else {
          target.$el.click(function () {
            const eyeDropper = new EyeDropper();
            const abortController = new AbortController();
            eyeDropper.open({
              signal: abortController.signal
            }).then(result => {
              target.$el.find('input.wp-color-picker').first().iris('color', result.sRGBHex);
            }).catch(e => {
              // silence
              console.log({
                'error': 'eyedropper catch',
                e
              });
            });
            setTimeout(() => {
              abortController.abort();
              console.log('eyedropper abort');
            }, 5000);
          });
        }
      };
      if (window.acf) {
        console.log('window acf');
        acf.addAction('ready', adminInit);
        acf.addAction(`render_block_preview`, adminInit);
        acf.addAction('remount', adminInit);
        acf.addAction('ready_field/type=color_picker', addEyeDropper);
        acf.addAction('append_field/type=color_picker', addEyeDropper);
      }
      window.addEventListener('resize', adminInit);
      document.addEventListener('DOMContentLoaded', adminInit);
      adminInit();
      setTimeout(() => {
        adminInit();
        setTimeout(() => {
          adminInit();
        }, 1000);
      }, 1000);
    }
    if (document.readyState === 'complete') {
      onReady$1();
    } else {
      window.addEventListener("DOMContentLoaded", onReady$1);
    }

    console.log('Debug.js');
    // DEBUG TOOLS
    if (!window.acf) {
      let showGuides = false;
      window.addEventListener('keypress', e => {
        if (e.which == 104) {
          //H
          showGuides = !showGuides;
          document.body.classList[showGuides ? 'add' : 'remove']("is-debug");
        }
      });
    }

    if (document.readyState === 'complete') {
      onReady();
    } else {
      window.addEventListener("DOMContentLoaded", onReady);
    }
    function onReady() {
      console.log('Section.js');
      // fix height of viewport height section so they fit the grid
      function adjustSectionHeight() {
        const baseLineHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--vertical-rhythm'), 10);
        const viewportHeight = window.innerHeight;
        const adjustedHeight = viewportHeight - viewportHeight % baseLineHeight;
        document.documentElement.style.setProperty('--adjusted-height', `${adjustedHeight}px`);
      }
      adjustSectionHeight();
      window.addEventListener('resize', adjustSectionHeight);
    }

    class CoreSlideshow extends HTMLElement {
      constructor() {
        super();
        this.data = {
          index: 0
        };
        this.prev = this.prev.bind(this);
        this.next = this.next.bind(this);
      }
      next() {
        this.data.index++;
        this.data.index = this.data.index > this.$slides.length - 1 ? 0 : this.data.index;
        this.updateSlides();
      }
      prev() {
        this.data.index--;
        this.data.index = this.data.index < 0 ? this.$slides.length - 1 : this.data.index;
        this.updateSlides();
      }
      updateSlides() {
        this.$slides.forEach((el, i) => {
          el.classList[i == this.data.index ? 'add' : 'remove']('is-active');
          if (i == this.data.index) {
            el.removeAttribute('tabindex');
            el.style.pointerEvents = 'auto';
            el.removeAttribute('aria-hidden');
            el.focus();
          } else {
            el.setAttribute('tabindex', -1);
            el.style.pointerEvents = 'none';
            el.setAttribute('aria-hidden', true);
          }
        });
      }
      connectedCallback() {
        this.$slides = this.querySelectorAll('[data-slide');
        this.$prevBtn = this.querySelector('[data-prev-btn');
        this.$nextBtn = this.querySelector('[data-next-btn');
        this.$prevBtn.addEventListener('click', this.prev, false);
        this.$nextBtn.addEventListener('click', this.next, false);
        this.updateSlides();
      }
      disconnectedCallback() {
        this.$prevBtn.removeEventListener('click', this.prev, false);
        this.$nextBtn.removeEventListener('click', this.next, false);
      }
    }
    customElements.define('core-slideshow', CoreSlideshow);

    class CoreExpandable extends HTMLElement {
      constructor() {
        super();
        this.data = {
          opened: false
        };
        this.toggle = this.toggle.bind(this);
      }
      toggle() {
        this.data.opened = !this.data.opened;
        this.$content.style.display = this.data.opened ? 'block' : 'none';
        this.$btn.classList[this.data.opened ? 'add' : 'remove']('is-opened');
        if (this.$parent) {
          this.$parent.classList[this.data.opened ? 'add' : 'remove']('is-selected');
        }
      }
      connectedCallback() {
        this.$content = this.querySelector('[data-expand-content');
        this.$btn = this.querySelector('[data-expand-button');
        this.$btn.addEventListener('click', this.toggle, false);
        this.$content.style.display = 'none';
        let node = this.parentNode;
        while (node && node !== document) {
          if (node.hasAttribute('data-expandable-parent')) {
            this.$parent = node;
            break;
          }
          node = node.parentNode;
        }
      }
      disconnectedCallback() {
        this.$btn.removeEventListener('click', this.toggle, false);
      }
    }
    customElements.define('core-expandable', CoreExpandable);

    class CoreTabs extends HTMLElement {
      constructor() {
        super();
        this.onButtonDown = this.onButtonDown.bind(this);
      }
      connectedCallback() {
        this.$buttons = this.querySelectorAll('[tab-button]');
        this.$slides = this.querySelectorAll('[tab-slide]');
        this.$buttons.forEach((el, i) => {
          el.setAttribute('data-index', i);
          el.addEventListener('click', this.onButtonDown);
        });
        this.$slides.forEach((el, i) => {
          el.classList[i == 0 ? 'add' : 'remove']('is-selected');
        });
        this.$buttons.forEach((el, i) => {
          el.classList[i == 0 ? 'add' : 'remove']('is-selected');
        });
      }
      disconnectedCallback() {
        this.$buttons.forEach((el, i) => {
          el.removeEventListener('click', this.onButtonDown);
        });
      }
      onButtonDown(e) {
        const index = Number(e.currentTarget.getAttribute('data-index'));
        console.log('BUTTON TAB ', index, this.$slides);
        this.$slides.forEach((el, i) => {
          el.classList[i == index ? 'add' : 'remove']('is-selected');
        });
        this.$buttons.forEach((el, i) => {
          el.classList[i == index ? 'add' : 'remove']('is-selected');
        });
      }
    }
    customElements.define('core-tabs', CoreTabs);

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    var FileSaver = {exports: {}};

    (function (module, exports) {
      (function (global, factory) {
        {
          factory();
        }
      })(commonjsGlobal, function () {

        /*
        * FileSaver.js
        * A saveAs() FileSaver implementation.
        *
        * By Eli Grey, http://eligrey.com
        *
        * License : https://github.com/eligrey/FileSaver.js/blob/master/LICENSE.md (MIT)
        * source  : http://purl.eligrey.com/github/FileSaver.js
        */
        // The one and only way of getting global scope in all environments
        // https://stackoverflow.com/q/3277182/1008999
        var _global = typeof window === 'object' && window.window === window ? window : typeof self === 'object' && self.self === self ? self : typeof commonjsGlobal === 'object' && commonjsGlobal.global === commonjsGlobal ? commonjsGlobal : void 0;
        function bom(blob, opts) {
          if (typeof opts === 'undefined') opts = {
            autoBom: false
          };else if (typeof opts !== 'object') {
            console.warn('Deprecated: Expected third argument to be a object');
            opts = {
              autoBom: !opts
            };
          } // prepend BOM for UTF-8 XML and text/* types (including HTML)
          // note: your browser will automatically convert UTF-16 U+FEFF to EF BB BF

          if (opts.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
            return new Blob([String.fromCharCode(0xFEFF), blob], {
              type: blob.type
            });
          }
          return blob;
        }
        function download(url, name, opts) {
          var xhr = new XMLHttpRequest();
          xhr.open('GET', url);
          xhr.responseType = 'blob';
          xhr.onload = function () {
            saveAs(xhr.response, name, opts);
          };
          xhr.onerror = function () {
            console.error('could not download file');
          };
          xhr.send();
        }
        function corsEnabled(url) {
          var xhr = new XMLHttpRequest(); // use sync to avoid popup blocker

          xhr.open('HEAD', url, false);
          try {
            xhr.send();
          } catch (e) {}
          return xhr.status >= 200 && xhr.status <= 299;
        } // `a.click()` doesn't work for all browsers (#465)

        function click(node) {
          try {
            node.dispatchEvent(new MouseEvent('click'));
          } catch (e) {
            var evt = document.createEvent('MouseEvents');
            evt.initMouseEvent('click', true, true, window, 0, 0, 0, 80, 20, false, false, false, false, 0, null);
            node.dispatchEvent(evt);
          }
        } // Detect WebView inside a native macOS app by ruling out all browsers
        // We just need to check for 'Safari' because all other browsers (besides Firefox) include that too
        // https://www.whatismybrowser.com/guides/the-latest-user-agent/macos

        var isMacOSWebView = /Macintosh/.test(navigator.userAgent) && /AppleWebKit/.test(navigator.userAgent) && !/Safari/.test(navigator.userAgent);
        var saveAs = _global.saveAs || (
        // probably in some web worker
        typeof window !== 'object' || window !== _global ? function saveAs() {}
        /* noop */
        // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView
        : 'download' in HTMLAnchorElement.prototype && !isMacOSWebView ? function saveAs(blob, name, opts) {
          var URL = _global.URL || _global.webkitURL;
          var a = document.createElement('a');
          name = name || blob.name || 'download';
          a.download = name;
          a.rel = 'noopener'; // tabnabbing
          // TODO: detect chrome extensions & packaged apps
          // a.target = '_blank'

          if (typeof blob === 'string') {
            // Support regular links
            a.href = blob;
            if (a.origin !== location.origin) {
              corsEnabled(a.href) ? download(blob, name, opts) : click(a, a.target = '_blank');
            } else {
              click(a);
            }
          } else {
            // Support blobs
            a.href = URL.createObjectURL(blob);
            setTimeout(function () {
              URL.revokeObjectURL(a.href);
            }, 4E4); // 40s

            setTimeout(function () {
              click(a);
            }, 0);
          }
        } // Use msSaveOrOpenBlob as a second approach
        : 'msSaveOrOpenBlob' in navigator ? function saveAs(blob, name, opts) {
          name = name || blob.name || 'download';
          if (typeof blob === 'string') {
            if (corsEnabled(blob)) {
              download(blob, name, opts);
            } else {
              var a = document.createElement('a');
              a.href = blob;
              a.target = '_blank';
              setTimeout(function () {
                click(a);
              });
            }
          } else {
            navigator.msSaveOrOpenBlob(bom(blob, opts), name);
          }
        } // Fallback to using FileReader and a popup
        : function saveAs(blob, name, opts, popup) {
          // Open a popup immediately do go around popup blocker
          // Mostly only available on user interaction and the fileReader is async so...
          popup = popup || open('', '_blank');
          if (popup) {
            popup.document.title = popup.document.body.innerText = 'downloading...';
          }
          if (typeof blob === 'string') return download(blob, name, opts);
          var force = blob.type === 'application/octet-stream';
          var isSafari = /constructor/i.test(_global.HTMLElement) || _global.safari;
          var isChromeIOS = /CriOS\/[\d]+/.test(navigator.userAgent);
          if ((isChromeIOS || force && isSafari || isMacOSWebView) && typeof FileReader !== 'undefined') {
            // Safari doesn't allow downloading of blob URLs
            var reader = new FileReader();
            reader.onloadend = function () {
              var url = reader.result;
              url = isChromeIOS ? url : url.replace(/^data:[^;]*;/, 'data:attachment/file;');
              if (popup) popup.location.href = url;else location = url;
              popup = null; // reverse-tabnabbing #460
            };

            reader.readAsDataURL(blob);
          } else {
            var URL = _global.URL || _global.webkitURL;
            var url = URL.createObjectURL(blob);
            if (popup) popup.location = url;else location.href = url;
            popup = null; // reverse-tabnabbing #460

            setTimeout(function () {
              URL.revokeObjectURL(url);
            }, 4E4); // 40s
          }
        });

        _global.saveAs = saveAs.saveAs = saveAs;
        {
          module.exports = saveAs;
        }
      });
    })(FileSaver);

    // https://github.com/nwcell/ics.js/blob/master/ics.js
    /* global saveAs, Blob, BlobBuilder, console */
    /* exported ics */

    function ics (uidDomain, prodId) {

      if (navigator.userAgent.indexOf('MSIE') > -1 && navigator.userAgent.indexOf('MSIE 10') == -1) {
        console.log('Unsupported Browser');
        return;
      }
      if (typeof uidDomain === 'undefined') {
        uidDomain = 'default';
      }
      if (typeof prodId === 'undefined') {
        prodId = 'Calendar';
      }
      var SEPARATOR = navigator.appVersion.indexOf('Win') !== -1 ? '\r\n' : '\n';
      var calendarEvents = [];
      var calendarStart = ['BEGIN:VCALENDAR', 'PRODID:' + prodId, 'VERSION:2.0'].join(SEPARATOR);
      var calendarEnd = SEPARATOR + 'END:VCALENDAR';
      var BYDAY_VALUES = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
      return {
        /**
         * Returns events array
         * @return {array} Events
         */
        'events': function () {
          return calendarEvents;
        },
        /**
         * Returns calendar
         * @return {string} Calendar in iCalendar format
         */
        'calendar': function () {
          return calendarStart + SEPARATOR + calendarEvents.join(SEPARATOR) + calendarEnd;
        },
        /**
         * Add event to the calendar
         * @param  {string} subject     Subject/Title of event
         * @param  {string} description Description of event
         * @param  {string} location    Location of event
         * @param  {string} begin       Beginning date of event
         * @param  {string} stop        Ending date of event
         */
        'addEvent': function (subject, description, location, begin, stop, rrule) {
          // I'm not in the mood to make these optional... So they are all required
          if (typeof subject === 'undefined' || typeof description === 'undefined' || typeof location === 'undefined' || typeof begin === 'undefined' || typeof stop === 'undefined') {
            return false;
          }

          // validate rrule
          if (rrule) {
            if (!rrule.rrule) {
              if (rrule.freq !== 'YEARLY' && rrule.freq !== 'MONTHLY' && rrule.freq !== 'WEEKLY' && rrule.freq !== 'DAILY') {
                throw "Recurrence rrule frequency must be provided and be one of the following: 'YEARLY', 'MONTHLY', 'WEEKLY', or 'DAILY'";
              }
              if (rrule.until) {
                if (isNaN(Date.parse(rrule.until))) {
                  throw "Recurrence rrule 'until' must be a valid date string";
                }
              }
              if (rrule.interval) {
                if (isNaN(parseInt(rrule.interval))) {
                  throw "Recurrence rrule 'interval' must be an integer";
                }
              }
              if (rrule.count) {
                if (isNaN(parseInt(rrule.count))) {
                  throw "Recurrence rrule 'count' must be an integer";
                }
              }
              if (typeof rrule.byday !== 'undefined') {
                if (Object.prototype.toString.call(rrule.byday) !== '[object Array]') {
                  throw "Recurrence rrule 'byday' must be an array";
                }
                if (rrule.byday.length > 7) {
                  throw "Recurrence rrule 'byday' array must not be longer than the 7 days in a week";
                }

                // Filter any possible repeats
                rrule.byday = rrule.byday.filter(function (elem, pos) {
                  return rrule.byday.indexOf(elem) == pos;
                });
                for (var d in rrule.byday) {
                  if (BYDAY_VALUES.indexOf(rrule.byday[d]) < 0) {
                    throw "Recurrence rrule 'byday' values must include only the following: 'SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'";
                  }
                }
              }
            }
          }

          //TODO add time and time zone? use moment to format?
          var start_date = new Date(begin);
          var end_date = new Date(stop);
          var now_date = new Date();
          var start_year = ("0000" + start_date.getFullYear().toString()).slice(-4);
          var start_month = ("00" + (start_date.getMonth() + 1).toString()).slice(-2);
          var start_day = ("00" + start_date.getDate().toString()).slice(-2);
          var start_hours = ("00" + start_date.getHours().toString()).slice(-2);
          var start_minutes = ("00" + start_date.getMinutes().toString()).slice(-2);
          var start_seconds = ("00" + start_date.getSeconds().toString()).slice(-2);
          var end_year = ("0000" + end_date.getFullYear().toString()).slice(-4);
          var end_month = ("00" + (end_date.getMonth() + 1).toString()).slice(-2);
          var end_day = ("00" + end_date.getDate().toString()).slice(-2);
          var end_hours = ("00" + end_date.getHours().toString()).slice(-2);
          var end_minutes = ("00" + end_date.getMinutes().toString()).slice(-2);
          var end_seconds = ("00" + end_date.getSeconds().toString()).slice(-2);
          var now_year = ("0000" + now_date.getFullYear().toString()).slice(-4);
          var now_month = ("00" + (now_date.getMonth() + 1).toString()).slice(-2);
          var now_day = ("00" + now_date.getDate().toString()).slice(-2);
          var now_hours = ("00" + now_date.getHours().toString()).slice(-2);
          var now_minutes = ("00" + now_date.getMinutes().toString()).slice(-2);
          var now_seconds = ("00" + now_date.getSeconds().toString()).slice(-2);

          // Since some calendars don't add 0 second events, we need to remove time if there is none...
          var start_time = '';
          var end_time = '';
          if (start_hours + start_minutes + start_seconds + end_hours + end_minutes + end_seconds != 0) {
            start_time = 'T' + start_hours + start_minutes + start_seconds;
            end_time = 'T' + end_hours + end_minutes + end_seconds;
          }
          var now_time = 'T' + now_hours + now_minutes + now_seconds;
          var start = start_year + start_month + start_day + start_time;
          var end = end_year + end_month + end_day + end_time;
          var now = now_year + now_month + now_day + now_time;

          // recurrence rrule vars
          var rruleString;
          if (rrule) {
            if (rrule.rrule) {
              rruleString = rrule.rrule;
            } else {
              rruleString = 'rrule:FREQ=' + rrule.freq;
              if (rrule.until) {
                var uDate = new Date(Date.parse(rrule.until)).toISOString();
                rruleString += ';UNTIL=' + uDate.substring(0, uDate.length - 13).replace(/[-]/g, '') + '000000Z';
              }
              if (rrule.interval) {
                rruleString += ';INTERVAL=' + rrule.interval;
              }
              if (rrule.count) {
                rruleString += ';COUNT=' + rrule.count;
              }
              if (rrule.byday && rrule.byday.length > 0) {
                rruleString += ';BYDAY=' + rrule.byday.join(',');
              }
            }
          }
          new Date().toISOString();
          var calendarEvent = ['BEGIN:VEVENT', 'UID:' + calendarEvents.length + "@" + uidDomain, 'CLASS:PUBLIC', 'DESCRIPTION:' + description, 'DTSTAMP;VALUE=DATE-TIME:' + now, 'DTSTART;VALUE=DATE-TIME:' + start, 'DTEND;VALUE=DATE-TIME:' + end, 'LOCATION:' + location, 'SUMMARY;LANGUAGE=en-us:' + subject, 'TRANSP:TRANSPARENT', 'END:VEVENT'];
          if (rruleString) {
            calendarEvent.splice(4, 0, rruleString);
          }
          calendarEvent = calendarEvent.join(SEPARATOR);
          calendarEvents.push(calendarEvent);
          return calendarEvent;
        },
        /**
         * Download calendar using the saveAs function from filesave.js
         * @param  {string} filename Filename
         * @param  {string} ext      Extention
         */
        'download': function (filename, ext) {
          if (calendarEvents.length < 1) {
            return false;
          }
          ext = typeof ext !== 'undefined' ? ext : '.ics';
          filename = typeof filename !== 'undefined' ? filename : 'calendar';
          var calendar = calendarStart + SEPARATOR + calendarEvents.join(SEPARATOR) + calendarEnd;
          var blob;
          if (navigator.userAgent.indexOf('MSIE 10') === -1) {
            // chrome or firefox
            blob = new Blob([calendar]);
          } else {
            // ie
            var bb = new BlobBuilder();
            bb.append(calendar);
            blob = bb.getBlob('text/x-vCalendar;charset=' + document.characterSet);
          }
          saveAs(blob, filename + ext);
          return calendar;
        },
        /**
         * Build and return the ical contents
         */
        'build': function () {
          if (calendarEvents.length < 1) {
            return false;
          }
          var calendar = calendarStart + SEPARATOR + calendarEvents.join(SEPARATOR) + calendarEnd;
          return calendar;
        }
      };
    }

    function getDateAndTime(datetime) {
      const [day, month, year, hour, minute, period] = datetime.split(/\/| |:/);
      let adjustedHour = parseInt(hour);
      if (period.toLowerCase() === 'pm' && adjustedHour !== 12) {
        adjustedHour += 12;
      } else if (period.toLowerCase() === 'am' && adjustedHour === 12) {
        adjustedHour = 0; // Adjust for 12am to be 00 hour
      }

      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T${adjustedHour.toString().padStart(2, '0')}:${minute.padStart(2, '0')}:00`;
    }
    class CoreICS extends HTMLElement {
      constructor() {
        super();
        this.onButtonclick = this.onButtonclick.bind(this);
      }
      connectedCallback() {
        const event = {
          title: this.getAttribute('title'),
          description: this.getAttribute('description'),
          location: this.getAttribute('location'),
          begin: this.getAttribute('begin'),
          end: this.getAttribute('end'),
          filename: this.getAttribute('start') || 'microsoft-event'
        };
        event.begin = getDateAndTime(event.begin);
        event.end = getDateAndTime(event.end);
        console.log('CORE ICS', event);
        this.cal = ics();
        this.cal.addEvent(event.title, event.description, event.location, event.begin, event.end);
        this.$btn = this.querySelector('[ics-button]');
        this.$btn?.addEventListener('click', this.onButtonclick);
      }
      disconnectedCallback() {
        this.$btn?.removeEventListener('click', this.onButtonclick);
      }
      onButtonclick(e) {
        console.log('DONWLOAD ICS !');
        this.cal.download('microsoft-event');
      }
    }
    customElements.define('core-ics', CoreICS);

    // Scripts that should lie in website footer.

    /**
     * jQuery Functions
     * Wrap everything that requires jQuery in the following.
     */
    jQuery(document).ready(function ($) {
      // turn the gallery into a slider
      $('.mssrc-block-content-gallery .image-gallery__gallery--4 .slick').slick({
        infinite: false,
        variableWidth: true,
        adaptiveHeight: true,
        centerMode: true
      });

      // infinite scroll
      $('.results-column').infiniteScroll({
        path: '.pagination .next',
        append: '.results-article',
        history: 'push',
        hideNav: '.pagination',
        status: '.results-status',
        button: '.results-button',
        scrollThreshold: false
      });
    });

}));
//# sourceMappingURL=footer.js.map
