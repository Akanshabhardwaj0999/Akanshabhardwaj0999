const fs = require('fs');
const path = './data/policies.txt';


//function to get all policies
const getAllPolicies = () => {
    const data = fs.readFileSync(path, 'utf8');
    return data ? JSON.parse(data) : [];
};


//function to create new policy
const addPolicy = (policy) => {
    const policies = getAllPolicies();
    policies.push(policy);
    fs.writeFileSync(path, JSON.stringify(policies, null, 2));
};


//function to delete a policy using policyId
const deletePolicy = (id) => {
    let policies = getAllPolicies();
    policies = policies.filter(policy => policy.policyId != id);
    fs.writeFileSync(path, JSON.stringify(policies, null, 2));
};

module.exports = { getAllPolicies, addPolicy, deletePolicy };