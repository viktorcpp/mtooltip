
export default class MTooltip
{
    constructor()
    {
        this.options          = {};
        this.options.sel_main = "[data-mtooltip]";
        this.options.cls_main = "mtooltip";

        this.tooltip = null;

    } // constructor



    Init()
    {
        this.tooltip = document.createElement( "div" );
        this.tooltip.classList.add( this.options.cls_main );
        document.body.appendChild( this.tooltip );

        let _elements = Array.from( document.querySelectorAll( this.options.sel_main ) );
        _elements.forEach((_el)=>{
            _el.addEventListener( "mouseenter", this._OnMouseEntered( this, _el ) );
            _el.addEventListener( "mouseleave", this._OnMouseLeaved ( this, _el ) );
        });

    } // Init



    _OnMouseEntered( _this, _el )
    {
        return function(e)
        {
            e.preventDefault();

            let _offset = _this._Offset( _el );
            
            _this.tooltip.innerText = _el.attributes["data-mtooltip"].value;

            let _scroll_top  = document.documentElement.scrollTop;
            let _scroll_left = document.documentElement.scrollLeft;
            let _el_top      = _offset.y;
            let _el_left     = _offset.x;
            let _el_w        = _el.offsetWidth;
            let _el_h        = _el.offsetHeight;
            let _doc_w       = document.documentElement.offsetWidth;
            let _doc_h       = document.documentElement.offsetHeight;

            if( _el_top - _scroll_top < _this.tooltip.offsetHeight )
            {
                // show at bottom
                _this.tooltip.style.top  = _offset.y + _el_h + 3 + "px";
            }
            else
            {
                // show above by default
                _this.tooltip.style.top = _offset.y - _this.tooltip.offsetHeight + 2 + "px";
            }

            if( _el_left + _this.tooltip.offsetWidth > _doc_w )
            {
                // align by right end
                _this.tooltip.style.left  = "auto";
                _this.tooltip.style.right = "3px";
            }
            else
            {
                // show at one vert line
                _this.tooltip.style.left  = _offset.x + "px";
                _this.tooltip.style.right = "auto";
            }

        }

    } // _OnMouseEntered



    _OnMouseLeaved( _this, _el )
    {
        return function(e)
        {
            e.preventDefault();

            _this.tooltip.innerText   = "";
            _this.tooltip.style.top   = "-99999px";
            _this.tooltip.style.left  = "0px";
            _this.tooltip.style.right = null;
        }

    } // _OnMouseLeaved



    _Offset( obj )
    {
        let _ret = {x:0,y:0};
        while( obj.offsetParent )
        {
            _ret.x = obj.offsetLeft;
            _ret.y = obj.offsetTop;

            obj = obj.offsetParent;
        }

        return _ret;

    } // _Offset

}; // class MTooltip
