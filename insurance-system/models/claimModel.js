const fs = require('fs');
const path = './data/claims.txt';

const getAllClaims = () => {
    const data = fs.readFileSync(path, 'utf8');
    return data ? JSON.parse(data) : [];
};

const addClaim = (claim) => {
    const claims = getAllClaims();
    claims.push(claim);
    fs.writeFileSync(path, JSON.stringify(claims, null, 2));
};

const updateClaimStatus = (id, status) => {
    const claims = getAllClaims();
    const claim = claims.find(c => c.claimId === id);
    if (claim) {
        claim.status = status;
        fs.writeFileSync(path, JSON.stringify(claims, null, 2));
    }
};

module.exports = { getAllClaims, addClaim, updateClaimStatus };
