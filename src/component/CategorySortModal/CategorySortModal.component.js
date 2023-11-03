/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-undef */
/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-conditional */
import React, { useState } from 'react';
import Modal from 'react-modal';

import Field from 'Component/Field';
import FIELD_TYPE from 'Component/Field/Field.config';

Modal.setAppElement('body');
Modal.defaultStyles.overlay.backgroundColor = 'rgba(243,241,241,0.5)';
/** @namespace SonbolPwa/Component/CategorySortModal/Component/CategorySortModal */
export function CategorySortModal(props) {
    const [showSortModal, setShowSortModal] = useState(false);
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            padding: '20px 20px',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: '428px',
            width: '100%',
            borderRadius: '24px'
        }
    };

    const mobileStyle = {
        content: {
            top: 'auto',
            left: '50%',
            right: 'auto',
            padding: '20px 20px',
            bottom: '0',
            marginRight: '-50%',
            transform: 'translate(-50%, 0%)',
            maxWidth: '428px',
            width: '100%',
            borderTopLeftRadius: '24px',
            borderTopRightRadius: '24px'

        }
    };

    const { sortFields, isMobile, sortDirection, sortKey } = props;
    const [selected, setSelected] = useState(sortKey);
    const selectedStyle = isMobile ? mobileStyle : customStyles;
    function onChange(e) {
        const { onSortChange } = props;
        const [direction, key] = e.target.value.split(' ');
        onSortChange(direction, key.toLowerCase());
        setSelected(key);
        setShowSortModal(false);
    }

    return (
        <div className="category-sort">
            <section aria-hidden="true" onClick={ () => setShowSortModal(true) }>
                <div className="category-sort-icon-and-text">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="11.002"
                      height="15"
                      viewBox="0 0 11.002 15"
                    >
                        <g transform="translate(0.125)">
                            <g
                              transform="translate(-0.124)"
                              fill="#e4e2e4"
                            >
                                <path
                                  d="M 10.43169116973877 5.75 L 0.5683091878890991 5.75 L 5.5 0.3699736297130585 L 10.43169116973877 5.75 Z"
                                  stroke="none"
                                />
                                <path
                                  d="M 5.5 0.7399473190307617 L 1.136618614196777 5.5 L 9.863381385803223 5.5 L 5.5 0.7399473190307617 M 5.5 0 L 11 6 L 0 6 L 5.5 0 Z"
                                  stroke="none"
                                  fill="#5a8a89"
                                />
                            </g>
                            <g transform="translate(10.877 15) rotate(180)" fill="#e4e2e4">
                                <path d="M 10.43169116973877 5.75 L 0.5683091878890991 5.75 L 5.5 0.3699736297130585 L 10.43169116973877 5.75 Z" stroke="none" />
                                <path d="M 5.5 0.7399473190307617 L 1.136618614196777 5.5 L 9.863381385803223 5.5 L 5.5 0.7399473190307617 M 5.5 0 L 11 6 L 0 6 L 5.5 0 Z" stroke="none" fill="#5a8a89" />
                            </g>
                        </g>
                    </svg>
                </div>
                <p>{ __('Sort') }</p>
                <p className="boxsort">
                    { /* <span>{ sortDirection }</span> */ }
                    <span>{ sortKey }</span>
                </p>

            </section>
            { showSortModal ? (
                <Modal style={ selectedStyle } isOpen={ showSortModal } onRequestClose={ () => setShowSortModal(false) }>
                    <div className="filterhead">
                        <div className="txtfilhd">{ __('Filter By') }</div>
                        <div aria-hidden="true" className="txtfiltracors" onClick={ () => setShowSortModal(false) }>
                            { __('Close') }
                            <svg
                              version="1.1"
                              id="Layer_1"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                              x="0px"
                              y="0px"
                              width="16"
                              height="30"
                              viewBox="0 0 17 18"
                              xmlSpace="preserve"
                            >
                                <g>
                                    <path d="M10.6,17l-2.5-4.7L5.7,17H0.6l4.7-7.9L0.9,1.5h4.9l2.4,4.6l2.4-4.6h4.9l-4.4,7.7L16,17H10.6z" />
                                </g>
                            </svg>
                        </div>
                    </div>
                    { sortFields.map((field) => (
                        <div className="sort-options-container" key={ field.id }>

                            <Field
                              selected={ selected.replace(/^./, selected[0].toUpperCase()) }
                              type={ FIELD_TYPE.radio }
                              attr={ {
                                  id: 'category-sort',
                                  name: 'category-sort',
                                  defaultValue: `${sortDirection} ${field.label}`
                                  //    noPlaceholder: true
                              } }
                              events={ {
                                  onChange
                              } }
                              options={ field }
                              label={ field.label }
                              mix={ { block: 'CategorySort', elem: 'Radio' } }
                            />
                        </div>
                    )) }
                </Modal>
            ) : null }
        </div>
    );
}

export default CategorySortModal;
