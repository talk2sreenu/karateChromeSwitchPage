Feature: To verify the Switch Page in Local & Docker chrome browser
	
	Scenario: To verify switchPage in Local Chrome
		* configure driver = {type:'chrome', userDataDir:'target/chromeDriver'})
		* driver 'https://www.restaurant.com/'
		* maximize()
		* waitForEnabled('{a:1}Specials').click()
		* switchPage('https://specials.restaurant.com/')
		* waitUntil("document.readyState == 'complete'")
		* screenshot()
		
	Scenario: To verify switchPage in Karate-Chrome docker container
		* configure driverTarget = { docker: 'ptrthomas/karate-chrome', showDriverLog: true, addOptions:["--disable-popup-blocking", "--disable-extensions"]}
		* driver 'https://www.restaurant.com/'
		* maximize()
		* waitForEnabled('{a:1}Specials').click()
		* switchPage('https://specials.restaurant.com/')
		* waitUntil("document.readyState == 'complete'")
		* screenshot()