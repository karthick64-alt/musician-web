// Music Player Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Player State
    let isPlaying = false;
    let currentTime = 0;
    let duration = 225; // 3:45 in seconds
    let volume = 0.7;
    let isShuffled = false;
    let repeatMode = 0; // 0: off, 1: all, 2: one
    let currentSongIndex = 0;

    // Sample queue
    const queue = [
        { title: 'Cali Living', artist: 'Tom', art: 'https://i.pravatar.cc/150?img=33', duration: 225 },
        { title: 'On The Top', artist: 'Alma', art: 'https://i.pravatar.cc/150?img=45', duration: 198 },
        { title: 'Together', artist: 'Jonas&Jonas', art: 'https://i.pravatar.cc/150?img=50', duration: 245 }
    ];

    // DOM Elements
    const playPauseBtn = document.getElementById('playPauseBtn');
    const playPauseIcon = document.getElementById('playPauseIcon');
    const previousBtn = document.getElementById('previousBtn');
    const nextBtn = document.getElementById('nextBtn');
    const shuffleBtn = document.getElementById('shuffleBtn');
    const repeatBtn = document.getElementById('repeatBtn');
    const progressBar = document.getElementById('progressBar');
    const progressFill = document.getElementById('progressFill');
    const currentTimeEl = document.getElementById('currentTime');
    const totalTimeEl = document.getElementById('totalTime');
    const volumeBar = document.getElementById('volumeBar');
    const volumeFill = document.getElementById('volumeFill');
    const queueBtn = document.getElementById('queueBtn');
    const queueModal = document.getElementById('queueModal');
    const queueList = document.getElementById('queueList');
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const fullscreenPlayer = document.getElementById('fullscreenPlayer');
    const closeFullscreen = document.getElementById('closeFullscreen');
    const playerLike = document.getElementById('playerLike');
    const playerAlbumArt = document.getElementById('playerAlbumArt');
    const playerTitle = document.getElementById('playerTitle');
    const playerArtist = document.getElementById('playerArtist');
    const lyricsBtn = document.getElementById('lyricsBtn');
    const lyricsModal = document.getElementById('lyricsModal');
    const closeLyrics = document.getElementById('closeLyrics');
    const addToPlaylistBtn = document.getElementById('addToPlaylistBtn');
    const downloadBtn = document.getElementById('downloadBtn');

    // Fullscreen player elements
    const fullscreenPlayPause = document.getElementById('fullscreenPlayPause');
    const fullscreenPlayPauseIcon = document.getElementById('fullscreenPlayPauseIcon');
    const fullscreenProgressBar = document.getElementById('fullscreenProgressBar');
    const fullscreenProgressFill = document.getElementById('fullscreenProgressFill');
    const fullscreenCurrentTime = document.getElementById('fullscreenCurrentTime');
    const fullscreenTotalTime = document.getElementById('fullscreenTotalTime');
    const fullscreenAlbumArt = document.getElementById('fullscreenAlbumArt');
    const fullscreenTitle = document.getElementById('fullscreenTitle');
    const fullscreenArtist = document.getElementById('fullscreenArtist');

    // Initialize
    updatePlayerInfo();
    updateQueue();
    updateVolume();

    // Play/Pause
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', togglePlayPause);
    }
    if (fullscreenPlayPause) {
        fullscreenPlayPause.addEventListener('click', togglePlayPause);
    }

    function togglePlayPause() {
        isPlaying = !isPlaying;
        updatePlayPauseIcon();
        if (isPlaying) {
            startProgress();
        } else {
            stopProgress();
        }
    }

    function updatePlayPauseIcon() {
        if (playPauseIcon) {
            playPauseIcon.innerHTML = isPlaying 
                ? '<rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect>'
                : '<polygon points="5 3 19 12 5 21 5 3"></polygon>';
        }
        if (fullscreenPlayPauseIcon) {
            fullscreenPlayPauseIcon.innerHTML = isPlaying
                ? '<rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect>'
                : '<polygon points="5 3 19 12 5 21 5 3"></polygon>';
        }
    }

    // Progress
    let progressInterval;
    function startProgress() {
        progressInterval = setInterval(() => {
            if (currentTime < duration) {
                currentTime += 1;
                updateProgress();
            } else {
                nextSong();
            }
        }, 1000);
    }

    function stopProgress() {
        if (progressInterval) {
            clearInterval(progressInterval);
        }
    }

    function updateProgress() {
        const percentage = (currentTime / duration) * 100;
        if (progressFill) progressFill.style.width = percentage + '%';
        if (fullscreenProgressFill) fullscreenProgressFill.style.width = percentage + '%';
        if (currentTimeEl) currentTimeEl.textContent = formatTime(currentTime);
        if (fullscreenCurrentTime) fullscreenCurrentTime.textContent = formatTime(currentTime);
    }

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    // Progress bar click
    if (progressBar) {
        progressBar.addEventListener('click', (e) => {
            const rect = progressBar.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            currentTime = percent * duration;
            updateProgress();
        });
    }
    if (fullscreenProgressBar) {
        fullscreenProgressBar.addEventListener('click', (e) => {
            const rect = fullscreenProgressBar.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            currentTime = percent * duration;
            updateProgress();
        });
    }

    // Previous/Next
    if (previousBtn) {
        previousBtn.addEventListener('click', previousSong);
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSong);
    }
    if (document.getElementById('fullscreenPrevious')) {
        document.getElementById('fullscreenPrevious').addEventListener('click', previousSong);
    }
    if (document.getElementById('fullscreenNext')) {
        document.getElementById('fullscreenNext').addEventListener('click', nextSong);
    }

    function previousSong() {
        if (currentTime > 3) {
            currentTime = 0;
            updateProgress();
        } else {
            currentSongIndex = (currentSongIndex - 1 + queue.length) % queue.length;
            loadSong();
        }
    }

    function nextSong() {
        if (repeatMode === 2) {
            currentTime = 0;
            updateProgress();
        } else {
            currentSongIndex = (currentSongIndex + 1) % queue.length;
            loadSong();
        }
    }

    function loadSong() {
        const song = queue[currentSongIndex];
        currentTime = 0;
        duration = song.duration;
        updatePlayerInfo();
        updateProgress();
        if (totalTimeEl) totalTimeEl.textContent = formatTime(duration);
        if (fullscreenTotalTime) fullscreenTotalTime.textContent = formatTime(duration);
        if (isPlaying) {
            startProgress();
        }
        updateQueue();
    }

    function updatePlayerInfo() {
        const song = queue[currentSongIndex];
        if (playerTitle) playerTitle.textContent = song.title;
        if (playerArtist) playerArtist.textContent = song.artist;
        if (playerAlbumArt) playerAlbumArt.src = song.art;
        if (fullscreenTitle) fullscreenTitle.textContent = song.title;
        if (fullscreenArtist) fullscreenArtist.textContent = song.artist;
        if (fullscreenAlbumArt) fullscreenAlbumArt.src = song.art;
    }

    // Shuffle
    if (shuffleBtn) {
        shuffleBtn.addEventListener('click', () => {
            isShuffled = !isShuffled;
            shuffleBtn.classList.toggle('active', isShuffled);
            if (document.getElementById('fullscreenShuffle')) {
                document.getElementById('fullscreenShuffle').classList.toggle('active', isShuffled);
            }
        });
    }

    // Repeat
    if (repeatBtn) {
        repeatBtn.addEventListener('click', () => {
            repeatMode = (repeatMode + 1) % 3;
            repeatBtn.classList.toggle('active', repeatMode > 0);
            if (document.getElementById('fullscreenRepeat')) {
                document.getElementById('fullscreenRepeat').classList.toggle('active', repeatMode > 0);
            }
        });
    }

    // Volume
    if (volumeBar) {
        volumeBar.addEventListener('click', (e) => {
            const rect = volumeBar.getBoundingClientRect();
            volume = (e.clientX - rect.left) / rect.width;
            updateVolume();
        });
    }

    function updateVolume() {
        if (volumeFill) volumeFill.style.width = (volume * 100) + '%';
    }

    // Queue
    if (queueBtn) {
        queueBtn.addEventListener('click', () => {
            if (queueModal) queueModal.classList.toggle('active');
        });
    }
    if (document.getElementById('closeQueue')) {
        document.getElementById('closeQueue').addEventListener('click', () => {
            if (queueModal) queueModal.classList.remove('active');
        });
    }

    function updateQueue() {
        if (!queueList) return;
        queueList.innerHTML = '';
        queue.forEach((song, index) => {
            const item = document.createElement('div');
            item.className = 'queue-item' + (index === currentSongIndex ? ' active' : '');
            item.innerHTML = `
                <img src="${song.art}" alt="${song.title}" class="queue-item-art">
                <div class="queue-item-info">
                    <div class="queue-item-title">${song.title}</div>
                    <div class="queue-item-artist">${song.artist}</div>
                </div>
            `;
            item.addEventListener('click', () => {
                currentSongIndex = index;
                loadSong();
            });
            queueList.appendChild(item);
        });
    }

    // Fullscreen
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', () => {
            if (fullscreenPlayer) fullscreenPlayer.classList.add('active');
        });
    }
    if (playerAlbumArt) {
        playerAlbumArt.addEventListener('click', () => {
            if (fullscreenPlayer) fullscreenPlayer.classList.add('active');
        });
    }
    if (closeFullscreen) {
        closeFullscreen.addEventListener('click', () => {
            if (fullscreenPlayer) fullscreenPlayer.classList.remove('active');
        });
    }

    // Like
    if (playerLike) {
        playerLike.addEventListener('click', () => {
            playerLike.classList.toggle('active');
        });
    }

    // Lyrics
    if (lyricsBtn) {
        lyricsBtn.addEventListener('click', () => {
            if (lyricsModal) lyricsModal.classList.add('active');
        });
    }
    if (closeLyrics) {
        closeLyrics.addEventListener('click', () => {
            if (lyricsModal) lyricsModal.classList.remove('active');
        });
    }

    // Add to Playlist
    if (addToPlaylistBtn) {
        addToPlaylistBtn.addEventListener('click', () => {
            alert('Add to playlist functionality would be implemented here');
        });
    }

    // Download
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            alert('Download functionality would be implemented here');
        });
    }

    // Play button on song items
    document.querySelectorAll('.play-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const songItem = btn.closest('.song-item');
            if (songItem) {
                const title = songItem.querySelector('.song-title')?.textContent;
                const artist = songItem.querySelector('.song-artist')?.textContent;
                const img = songItem.querySelector('.song-artist-img')?.src;
                
                // Find song in queue or add it
                const index = queue.findIndex(s => s.title === title);
                if (index !== -1) {
                    currentSongIndex = index;
                } else {
                    queue.unshift({ title, artist, art: img, duration: 225 });
                    currentSongIndex = 0;
                }
                loadSong();
                if (!isPlaying) togglePlayPause();
            }
        });
    });

    // Initialize progress
    updateProgress();
});

