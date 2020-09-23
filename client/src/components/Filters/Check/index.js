import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Field, reduxForm } from 'redux-form';
import { shallowEqual, useSelector } from 'react-redux';
import Card from '../../ui/Card';

import { renderInputField } from '../../../helpers/form';
import Info from './Info';
import { FORM_NAME } from '../../../helpers/constants';

const Check = (props) => {
    const {
        pristine,
        invalid,
        processing,
        handleSubmit,
    } = props;

    const { t } = useTranslation();

    const {
        filters,
        whitelistFilters,
        check,
    } = useSelector((state) => state.filtering, shallowEqual);

    const {
        hostname,
        reason,
        filter_id,
        rule,
        service_name,
        cname,
        ip_addrs,
    } = check;

    return (
        <Card
            title={t('check_title')}
            subtitle={t('check_desc')}
        >
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="input-group">
                            <Field
                                id="name"
                                name="name"
                                component={renderInputField}
                                type="text"
                                className="form-control"
                                placeholder={t('form_enter_host')}
                            />
                            <span className="input-group-append">
                                <button
                                    className="btn btn-success btn-standard btn-large"
                                    type="submit"
                                    onClick={handleSubmit}
                                    disabled={pristine || invalid || processing}
                                >
                                    {t('check')}
                                </button>
                            </span>
                        </div>
                        {check.hostname && (
                            <>
                                <hr />
                                <Info
                                    filters={filters}
                                    whitelistFilters={whitelistFilters}
                                    hostname={hostname}
                                    reason={reason}
                                    filter_id={filter_id}
                                    rule={rule}
                                    service_name={service_name}
                                    cname={cname}
                                    ip_addrs={ip_addrs}
                                />
                            </>
                        )}
                    </div>
                </div>
            </form>
        </Card>
    );
};

Check.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    invalid: PropTypes.bool.isRequired,
    processing: PropTypes.bool.isRequired,
};

export default reduxForm({ form: FORM_NAME.DOMAIN_CHECK })(Check);
