package mx.com.Escom_TT.Escom.core.business.input;

import io.vertx.mutiny.redis.client.Redis;
import io.vertx.redis.client.RedisClientType;
import io.vertx.redis.client.RedisOptions;

import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.inject.Produces;

@ApplicationScoped
public class RedisConfig {

    @Produces
    @ApplicationScoped
    public Redis createRedisClient() {
        RedisOptions options = new RedisOptions()
                .setType(RedisClientType.STANDALONE)
                .addConnectionString("redis://localhost:6379");

        return Redis.createClient(io.vertx.mutiny.core.Vertx.vertx(), options);
    }
}
