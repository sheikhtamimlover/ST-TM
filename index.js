
const { createMail, checkMail, getAllMails, getMailInfo } = require('./src/tm');

async function testStTm() {
    console.log('🚀 Testing ST-TM (Simple Temporary Mail) Module\n');

    // Test 1: Create a new temporary mail
    console.log('📧 Creating new temporary mail...');
    const newMail = await createMail();
    
    if (newMail.success) {
        console.log('✅ Mail created successfully!');
        console.log(`📫 Mailbox: ${newMail.mailbox}`);
        console.log(`🔑 Token: ${newMail.token}\n`);

        // Test 2: Get mail info
        console.log('📋 Getting mail info...');
        const mailInfo = getMailInfo(newMail.mailbox);
        if (mailInfo.success) {
            console.log('✅ Mail info retrieved:');
            console.log(`📫 Mailbox: ${mailInfo.data.mailbox}`);
            console.log(`🕒 Created: ${mailInfo.data.createdAt}\n`);
        }

        // Test 3: Check for messages
        console.log('📨 Checking for messages...');
        const messages = await checkMail(newMail.mailbox);
        
        if (messages.success) {
            console.log(`✅ Messages checked! Found ${messages.messages.length} message(s)`);
            if (messages.messages.length > 0) {
                messages.messages.forEach((msg, index) => {
                    console.log(`\n📧 Message ${index + 1}:`);
                    console.log(`From: ${msg.from}`);
                    console.log(`Subject: ${msg.subject}`);
                    console.log(`Date: ${msg.date}`);
                    console.log(`Body: ${msg.body.substring(0, 100)}...`);
                });
            } else {
                console.log('📭 No messages found (this is normal for a new mailbox)\n');
            }
        } else {
            console.log('❌ Failed to check messages:', messages.error);
        }

        // Test 4: Get all mails
        console.log('📋 Getting all stored mails...');
        const allMails = getAllMails();
        if (allMails.success) {
            console.log(`✅ Found ${allMails.mails.length} stored mailbox(es)`);
            allMails.mails.forEach((mail, index) => {
                console.log(`${index + 1}. ${mail.mailbox} (Created: ${mail.createdAt})`);
            });
        }

    } else {
        console.log('❌ Failed to create mail:', newMail.error);
    }

    console.log('\n🎉 ST-TM module test completed!');
}

// Run the test
testStTm().catch(console.error);
