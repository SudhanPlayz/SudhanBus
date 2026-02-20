export interface HonoEnv {
	Variables: {
		userId: string;
		sessionId: string;
		requestId: string;
		agentId: string | undefined;
	};
}
