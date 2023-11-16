const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});
async function signupvendor(){
	const name=document.getElementById('Name').value
	const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
	const contact_number=document.getElementById('contact_number').value
	const gst_invoice=document.getElementById('gst_invoice').value
	const shop_address=document.getElementById('shop_address').value
	try {
        const response = await fetch('127.0.0.1:5501/api/vendorauth/CreateVendor', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name,email, password,contact_number,gst_invoice,shop_address }),
        });
	

	const data = await response.json();

	if (data.success) {
	  
	  console.log('SignUp successful', data.user);
	} else {
	  // Authentication failed, display an error message
	  console.error('SignUp failed', data.message);
	}
  } catch (error) {
	console.error('Error during Signup', error);
  }
}
async function signinvendor(){
	
	const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
	try {
        const response = await fetch('127.0.0.1:5501/api/vendorauth/LoginVendor', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({email, password}),
        });
	

	const data = await response.json();

	if (data.success) {
	  
	  console.log('SignIn successful', data.user);
	} else {
	  // Authentication failed, display an error message
	  console.error('SignIn failed', data.message);
	}
  } catch (error) {
	console.error('Error during Signup', error);
  }
}