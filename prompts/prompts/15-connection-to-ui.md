Read AGENTS.md first and follow it strictly.

Use the installed Vision Agents skill and Stream skills to connect the Audio Lesson screen to the Vision Agent so the AI teacher joins the same Stream call as the user.

Add Expo API routes to start and stop the agent that proxy to the Vision Agent server, and pack only opaque lesson/session identifiers into the Stream call's custom data and fetch the rich context server-side. Update the Python agent to actually consume those fields.
Make sure the agent has permission to publish audio in audio_room via SEND_AUDIO or the appropriate role grants, and describe goLive only as the action that takes the room out of backstage. Keep the audio_room admin/host permissions wording alongside the session cleanup guidance.

Do not expose any secrets in the mobile app. Keep the existing Stream audio flow intact. Show the agent connection status with idle, connecting, connected, and failed states.
