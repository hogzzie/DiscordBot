async function viewMembers() {
    try {
        const response = await fetch('https://YOUR_GITHUB_PAGES_URL/view-members');
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        const data = await response.json();
        document.getElementById('output').innerText = JSON.stringify(data, null, 2);
    } catch (error) {
        console.error('Error fetching members:', error);
        document.getElementById('output').innerText = 'Error fetching members';
    }
}

async function banMember() {
    try {
        const memberId = prompt('Enter the member ID to ban:');
        const response = await fetch('https://YOUR_GITHUB_PAGES_URL/ban-member', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ memberId })
        });
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        const data = await response.json();
        document.getElementById('output').innerText = data.message;
    } catch (error) {
        console.error('Error banning member:', error);
        document.getElementById('output').innerText = 'Error banning member';
    }
}

async function muteMember() {
    try {
        const memberId = prompt('Enter the member ID to mute:');
        const response = await fetch('https://YOUR_GITHUB_PAGES_URL/mute-member', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ memberId })
        });
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        const data = await response.json();
        document.getElementById('output').innerText = data.message;
    } catch (error) {
        console.error('Error muting member:', error);
        document.getElementById('output').innerText = 'Error muting member';
    }
}

async function writeAnnouncement() {
    try {
        const announcement = prompt('Enter your announcement:');
        const response = await fetch('https://YOUR_GITHUB_PAGES_URL/write-announcement', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ announcement })
        });
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        const data = await response.json();
        document.getElementById('output').innerText = data.message;
    } catch (error) {
        console.error('Error writing announcement:', error);
        document.getElementById('output').innerText = 'Error writing announcement';
    }
}
