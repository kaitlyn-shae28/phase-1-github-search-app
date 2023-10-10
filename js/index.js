document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.querySelector('#github-form');
    const searchInput = document.querySelector('#search');
    const repoList = document.querySelector('#repo-list');

    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const inputValue = searchInput.value;
        fetch(`https://api.github.com/search/users?q=${inputValue}`)
        .then(response => response.json())
        .then(data => {
            const userList = document.querySelector('#user-list');
            userList.innerHTML = '';
            data.items.forEach(user => {
                const userLink = document.createElement('a');
                userLink.href = user.html_url;
                userLink.textContent = user.login;
                userLink.addEventListener('click', () => {
                    fetch(`https://api.github.com/users/${user.login}/repos`)
                    .then(response => response.json())
                    .then(repos => {
                        repoList.innerHTML = '';
                        repos.forEach(repo => {
                            const repoLink = document.createElement('a');
                            repoLink.href = repo.html_url;
                            repoLink.textContent = repo.name;
                            const repoItem = document.createElement('li');
                            repoItem.appendChild(repoLink);
                            repoList.appendChild(repoItem);
                        });
                    })
                    .catch(error => {
                        console.error(error);
                    });
                });

                const userAvatar = document.createElement('img');
                userAvatar.src = user.avatar_url;
                userAvatar.alt = `${user.login}'s Avatar`;
                userAvatar.classList.add('avatar')

                const userInfo = document.createElement('div');
                userInfo.classList.add('user-info');
                userInfo.appendChild(userAvatar);
                userInfo.appendChild(userLink);

                const userItem = document.createElement('li');
                userItem.appendChild(userInfo);
                userList.appendChild(userItem);
            });
        })
        .catch(error => {
            console.error(error);
        });
    });
});