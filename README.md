
# ST-TM (Simple Temporary Mail)

A simple Node.js module for creating and managing temporary email addresses using the temp-mail.org API.

## Features

- 📧 Create temporary email addresses
- 📨 Check for received messages
- 📋 Store and retrieve mail information
- 🔍 Get all stored mailboxes
- 💾 In-memory storage (no database required)

## Installation

```bash
npm install st-tm
```

## Usage

```javascript
const { createMail, checkMail, getAllMails, getMailInfo } = require('st-tm');

// Create a new temporary email
async function example() {
    // Create mail
    const newMail = await createMail();
    if (newMail.success) {
        console.log('Mailbox:', newMail.mailbox);
        console.log('Token:', newMail.token);
        
        // Check for messages
        const messages = await checkMail(newMail.mailbox);
        if (messages.success) {
            console.log('Messages:', messages.messages);
        }
        
        // Get mail info
        const info = getMailInfo(newMail.mailbox);
        if (info.success) {
            console.log('Mail Info:', info.data);
        }
        
        // Get all stored mails
        const allMails = getAllMails();
        if (allMails.success) {
            console.log('All Mails:', allMails.mails);
        }
    }
}
```

## API Reference

### createMail()
Creates a new temporary email address.

**Returns:**
```javascript
{
    success: boolean,
    mailbox?: string,
    token?: string,
    error?: string
}
```

### checkMail(mailbox)
Checks for messages in the specified mailbox.

**Parameters:**
- `mailbox` (string): The email address to check

**Returns:**
```javascript
{
    success: boolean,
    mailbox?: string,
    messages?: Array,
    error?: string
}
```

### getAllMails()
Gets all stored mailbox information.

**Returns:**
```javascript
{
    success: boolean,
    mails?: Array,
    error?: string
}
```

### getMailInfo(mailbox)
Gets information about a specific mailbox.

**Parameters:**
- `mailbox` (string): The email address to get info for

**Returns:**
```javascript
{
    success: boolean,
    data?: Object,
    error?: string
}
```

## Message Object Structure

```javascript
{
    id: string,
    from: string,
    to: string,
    subject: string,
    date: string,
    body: string
}
```

## Dependencies

- axios: For HTTP requests to temp-mail.org API

## License

ISC

## Author

Created for simple temporary email management.

## Notes

- This module uses in-memory storage. Mail data will be lost when the application restarts.
- For production use, consider implementing persistent storage.
- The temp-mail.org API may have rate limits and usage restrictions.
- Tokens are automatically stored when creating mail and reused for checking messages.

## Example Output

```
📧 Creating new temporary mail...
✅ Mail created successfully!
📫 Mailbox: test@example.com
🔑 Token: abc123...

📨 Checking for messages...
✅ Messages checked! Found 0 message(s)
📭 No messages found (this is normal for a new mailbox)
```
