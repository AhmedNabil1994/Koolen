// react
import React, {
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';

// third-party
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';

// application
import Suggestions from './Suggestions';
import { Cross20Svg, Search20Svg } from '../../svg';

// apis,
import { getSearchedProduct } from '../../api/products';
import prodcutSchema from '../../helpers/productSchema';
import { toastError } from '../toast/toastComponent';

function Search(props) {
    const {
        context,
        className,
        inputRef,
        onClose,
        location,
    } = props;
    const [cancelFn, setCancelFn] = useState(() => () => {});
    const [suggestionsOpen, setSuggestionsOpen] = useState(false);
    const [hasSuggestions, setHasSuggestions] = useState(false);
    const [suggestedProducts, setSuggestedProducts] = useState([]);
    const [query, setQuery] = useState('');
    const wrapper = useRef(null);

    const close = useCallback(() => {
        if (onClose) {
            onClose();
        }
        setSuggestionsOpen(false);
    }, [onClose]);

    // Close suggestions when the location has been changed.
    useEffect(() => close(), [close, location]);

    // Close suggestions when a click has been made outside component.
    useEffect(() => {
        const onGlobalClick = (event) => {
            if (wrapper.current && !wrapper.current.contains(event.target)) {
                close();
            }
        };

        document.addEventListener('mousedown', onGlobalClick);

        return () => document.removeEventListener('mousedown', onGlobalClick);
    }, [close]);

    // Cancel previous typing.
    useEffect(() => () => cancelFn(), [cancelFn]);

    const handleFocus = () => {
        setSuggestionsOpen(true);
    };

    const handleChangeQuery = (event) => {
        let canceled = false;

        const newCancelFn = () => {
            canceled = true;
        };

        const query = event.target.value;

        setQuery(query);

        if (query === '') {
            setHasSuggestions(false);
        } else {
            // timer = setTimeout(() => {
            //     const options = { limit: 5 };

            //     shopApi.getSuggestions(query, options).then((products) => {
            //

            //         setSuggestedProducts(products);
            //         setHasSuggestions(products.length > 0);
            //         setSuggestionsOpen(true);
            //     });
            // }, 100);
            getSearchedProduct(query, (success) => {
                if (success.success) {
                    if (canceled) {
                        return;
                    }
                    const products = prodcutSchema(success.products.data);
                    setSuggestedProducts(products);
                    setHasSuggestions(products.length > 0);
                    setSuggestionsOpen(true);
                } else {
                    setSuggestedProducts([]);
                    setHasSuggestions(false);
                    setSuggestionsOpen(false);
                }
            }, (fail) => { toastError(fail); });
        }

        setCancelFn(() => newCancelFn);
    };

    const handleBlur = () => {
        setTimeout(() => {
            if (!document.activeElement || document.activeElement === document.body) {
                return;
            } // Close suggestions if the focus received an external element.
            if (wrapper.current && !wrapper.current.contains(document.activeElement)) {
                close();
            }
        }, 10);
    };

    // Close suggestions when the Escape key has been pressed.
    const handleKeyDown = (event) => {
        // Escape.
        if (event.which === 27) {
            close();
        }
    };

    const rootClasses = classNames(`search search--location--${context}`, className, {
        'search--suggestions-open': suggestionsOpen,
        'search--has-suggestions': hasSuggestions,
    });

    const closeButton = context !== 'mobile-header' ? '' : (
        <button className="search__button search__button--type--close" type="button" onClick={close}>
            <Cross20Svg />
        </button>
    );

    return (
        <div className={rootClasses} ref={wrapper} onBlur={handleBlur}>
            <div className="search__body">
                <form className="search__form" action="">
                    <input
                        ref={inputRef}
                        onChange={handleChangeQuery}
                        onFocus={handleFocus}
                        onKeyDown={handleKeyDown}
                        value={query}
                        className="search__input"
                        name="search"
                        placeholder="Search ..."
                        aria-label="Site search"
                        type="text"
                        autoComplete="off"
                    />
                    <button className="search__button search__button--type--submit" type="submit">
                        <Search20Svg />
                    </button>
                    {closeButton}
                    <div className="search__border" />
                </form>

                <Suggestions className="search__suggestions" context={context} products={suggestedProducts} />
            </div>
        </div>
    );
}

export default withRouter(Search);
