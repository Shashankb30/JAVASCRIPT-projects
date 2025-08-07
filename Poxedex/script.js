document.addEventListener('DOMContentLoaded', function() {
            const searchInput = document.getElementById('pokemon-search');
            const searchBtn = document.getElementById('search-btn');
            const displayArea = document.getElementById('pokemon-display');
            
            // Search when button is clicked
            searchBtn.addEventListener('click', searchPokemon);
            
            // Search when Enter key is pressed
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    searchPokemon();
                }
            });
            
            function searchPokemon() {
                const searchTerm = searchInput.value.trim().toLowerCase();
                
                if (!searchTerm) {
                    showError('Please enter a Pokémon name or ID');
                    return;
                }
                
                // Show loading indicator
                displayArea.innerHTML = `
                    <div class="loading">
                        <i class="fas fa-spinner"></i> Searching for Pokémon...
                    </div>
                `;
                
                // Construct the API URL
                const apiUrl = `https://pokeapi.co/api/v2/pokemon/${searchTerm}`;
                
                // Fetch Pokémon data
                fetch(apiUrl)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Pokémon not found!');
                        }
                        return response.json();
                    })
                    .then(data => {
                        displayPokemon(data);
                    })
                    .catch(error => {
                        showError(error.message);
                    });
            }
            
            function displayPokemon(pokemon) {
                // Get the Pokémon image
                const imageUrl = pokemon.sprites.other['official-artwork'].front_default || 
                                  pokemon.sprites.front_default;
                
                // Format height and weight
                const height = (pokemon.height / 10).toFixed(1) + ' m';
                const weight = (pokemon.weight / 10).toFixed(1) + ' kg';
                
                // Get types
                const types = pokemon.types.map(type => type.type.name);
                
                // Get abilities
                const abilities = pokemon.abilities.map(ability => ability.ability.name);
                
                // Create HTML for the Pokémon display
                displayArea.innerHTML = `
                    <img src="${imageUrl}" alt="${pokemon.name}" class="pokemon-image">
                    <h1 class="pokemon-name">${pokemon.name}</h1>
                    <div class="pokemon-id">#${pokemon.id.toString().padStart(3, '0')}</div>
                    
                    <div class="pokemon-details">
                        <div class="detail-card">
                            <h3>Type</h3>
                            <p>${types.map(type => `<span class="type-badge" style="background: ${getTypeColor(type)}">${type}</span>`).join('')}</p>
                        </div>
                        <div class="detail-card">
                            <h3>Height</h3>
                            <p>${height}</p>
                        </div>
                        <div class="detail-card">
                            <h3>Weight</h3>
                            <p>${weight}</p>
                        </div>
                        <div class="detail-card">
                            <h3>Abilities</h3>
                            <p>${abilities.join(', ')}</p>
                        </div>
                    </div>
                    
                    <div class="stats-container">
                        <h3 style="text-align: center; margin: 20px 0; color: #3b4cca;">Base Stats</h3>
                        ${pokemon.stats.map(stat => `
                            <div class="stat-row">
                                <div class="stat-name">${stat.stat.name}</div>
                                <div class="stat-bar-container">
                                    <div class="stat-bar" style="width: ${Math.min(100, stat.base_stat)}%"></div>
                                </div>
                                <div class="stat-value">${stat.base_stat}</div>
                            </div>
                        `).join('')}
                    </div>
                `;
            }
            
            function showError(message) {
                displayArea.innerHTML = `
                    <div class="error-message">
                        <i class="fas fa-exclamation-triangle"></i> ${message}
                    </div>
                `;
            }
            
            function getTypeColor(type) {
                const typeColors = {
                    normal: '#A8A878',
                    fire: '#F08030',
                    water: '#6890F0',
                    electric: '#F8D030',
                    grass: '#78C850',
                    ice: '#98D8D8',
                    fighting: '#C03028',
                    poison: '#A040A0',
                    ground: '#E0C068',
                    flying: '#A890F0',
                    psychic: '#F85888',
                    bug: '#A8B820',
                    rock: '#B8A038',
                    ghost: '#705898',
                    dragon: '#7038F8',
                    dark: '#705848',
                    steel: '#B8B8D0',
                    fairy: '#EE99AC'
                };
                
                return typeColors[type] || '#68A090';
            }
        });