const login = async ({email, password}) => {
    try {
        await testConnection();
       
        // Get user by email
        const result = await sql.query`
            SELECT * FROM usersA
            WHERE Email = ${email}
        `;
       
        const user = result.recordset[0];
       
        // Check if user exists
        if (!user) {
            throw new Error('Invalid credentials');
        }
       
        // Verify password
        const isValidPassword = await bcrypt.compare(password, user.Password);
        if (!isValidPassword) {
            throw new Error('Invalid credentials');
        }
       
        // Generate JWT token
        const token = generateJWT(user.Id, user.Email);
       
        // Remove password from user object
        delete user.Password;
       
        return { user, token };
    } catch (error) {
        console.log('Error during login:', error.message);
        throw error;
    } finally {
        await sql.close();
    }
};