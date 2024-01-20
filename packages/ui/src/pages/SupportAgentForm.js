import React, { useState } from 'react';

const SupportAgentForm = () => {

    return (
        <form onSubmit={handleSubmit}>
            {/* Create input fields for name, email, phone, and description */}
            <button type="submit">Create Support Agent</button>
        </form>
    );
};

export default SupportAgentForm;
