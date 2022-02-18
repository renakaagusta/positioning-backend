const { Pool } = require("pg");
const { nanoid } = require("nanoid");
const InvariantError = require("../../exceptions/InvariantError");
const NotFoundError = require("../../exceptions/NotFoundError");
const AuthorizationError = require("../../exceptions/AuthorizationError");
const { mapDBToModel } = require("../../utils");

class PlaylistsService {
    constructor(songService, collaborationService) {
        this._pool = new Pool();
        this._collaborationService = collaborationService;
        this._songService = songService
    }

    async addPlaylist({ name, owner }) {
        const id = `playlist-${nanoid(16)}`;

        const query = {
            text: "INSERT INTO playlists VALUES($1, $2, $3) RETURNING id",
            values: [id, name, owner],
        };

        const result = await this._pool.query(query);

        if (!result.rows[0].id) {
            throw new InvariantError("Playlist gagal ditambahkan");
        }

        return result.rows[0].id;
    }

    async getPlaylists(owner) {
        const query = {
            text: `SELECT playlists.id, playlists.name, users.username FROM playlists
    LEFT JOIN collaborations ON collaborations.playlist_id = playlists.id
    LEFT JOIN users ON users.id = playlists.owner
    WHERE playlists.owner = $1 OR collaborations.user_id = $1`,
            values: [owner],
        };
        const result = await this._pool.query(query);
        return result.rows.map(mapDBToModel);
    }

    async getPlaylistById(id) {
        const query = {
            text: `SELECT playlists.*, users.username
    FROM playlists
    LEFT JOIN users ON users.id = playlists.owner
    WHERE playlists.id = $1`,
            values: [id],
        };
        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError("Playlist tidak ditemukan");
        }

        return result.rows.map(mapDBToModel)[0];
    }

    async editPlaylistById(id, { name }) {
        const query = {
            text: "UPDATE playlists SET name = $1 WHERE id = $2 RETURNING id",
            values: [name, id],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError("Gagal memperbarui playlist. Id tidak ditemukan");
        }
    }

    async deletePlaylistById(id) {
        const query = {
            text: "DELETE FROM playlists WHERE id = $1 RETURNING id",
            values: [id],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError("Playlist gagal dihapus. Id tidak ditemukan");
        }
    }

    async addPlaylistSong(playlist, song) {
        try {
            await this._songService.getSongById(song)

            const id = nanoid(16);

            const query = {
                text: "INSERT INTO playlists_item VALUES($1, $2, $3) RETURNING id",
                values: [id, playlist, song],
            };

            const result = await this._pool.query(query);

            if (!result.rows[0].id) {
                throw new InvariantError("Lagu gagal ditambahkan");
            }

            return result.rows[0].id;
        } catch (error) {
            throw new NotFoundError("Lagu tidak ditemukan");
        }
    }

    async getPlaylistSong(id) {
        const query = {
            text: 'SELECT songs.id, songs.title, songs.performer FROM songs LEFT JOIN playlists_item ON songs.id = playlists_item.song_id WHERE playlists_item.playlist_id = $1;',
            values: [id],
        };
        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError("Playlist tidak ditemukan");
        }

        return result.rows.map(mapDBToModel);
    }

    async deletePlaylistSongById(playlist, song) {
        const query = {
            text: "DELETE FROM playlists_item WHERE playlist_id = $1 AND song_id = $2 RETURNING id",
            values: [playlist, song],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new InvariantError("Lagu gagal dihapus. Id tidak ditemukan");
        }
    }

    async verifyPlaylistOwner(id, owner) {
        const query = {
            text: "SELECT * FROM playlists WHERE id = $1",
            values: [id],
        };
        const result = await this._pool.query(query);
        if (!result.rows.length) {
            throw new NotFoundError("Playlist tidak ditemukan");
        }
        const playlist = result.rows[0];
        if (playlist.owner !== owner) {
            throw new AuthorizationError("Anda tidak berhak mengakses resource ini");
        }
    }

    async verifyPlaylistAccess(playlistId, userId) {
        try {
            await this.verifyPlaylistOwner(playlistId, userId);
        } catch (error) {
            if (error instanceof NotFoundError) {
                throw error;
            }
            try {
                await this._collaborationService.verifyCollaborator(playlistId, userId);
            } catch {
                throw error;
            }
        }
    }

    async getUsersByUsername(username) {
        const query = {
            text: "SELECT id, username, fullname FROM users WHERE username LIKE $1",
            values: [`%${username}%`],
        };
        const result = await this._pool.query(query);
        return result.rows;
    }
}

module.exports = PlaylistsService;