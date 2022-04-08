package io.github.yu.blog.service.impl;

import eu.bitwalker.useragentutils.UserAgent;
import io.github.yu.base.service.impl.BaseServiceImpl;
import io.github.yu.blog.mapper.LoginHistoryMapper;
import io.github.yu.blog.model.IpResult;
import io.github.yu.blog.model.LoginHistory;
import io.github.yu.blog.service.LoginHistoryService;
import io.github.yu.common.util.IdUtil;
import io.github.yu.common.util.RequestUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;

@Service
@Slf4j
public class LoginHistoryServiceImpl extends BaseServiceImpl<LoginHistory, LoginHistory, LoginHistoryMapper>
        implements LoginHistoryService {
    @Value("${blog.ip.key}")
    private String key;

    @Autowired
    private RestTemplate restTemplate;

    @Override
    @Transactional(rollbackFor = {RuntimeException.class, Error.class})
    public void insert(LoginHistory loginHistory) {
        loginHistory.setId(IdUtil.getId());
        loginHistory.setLoginTime(LocalDateTime.now());
        String ip = RequestUtil.getRequestIp();
        if (ip.equals("127.0.0.1")) {
            loginHistory.setLoginSite("localhost");
        } else {
            loginHistory.setLoginSite(getCity(ip));
        }
        loginHistory.setLoginIp(ip);
        loginHistory.setBrowserName(getBrowserInfo(RequestUtil.getFromHeader("User-Agent")));
        super.mapper.insert(loginHistory);
    }

    private String getCity(String ip) {
        String url = "https://apis.map.qq.com/ws/location/v1/ip?ip={1}&key={2}";
        IpResult result = restTemplate.getForObject(url, IpResult.class, ip, key);
        try {
            Assert.notNull(result, "获取ip:" + ip + "地址失败");
            Assert.notNull(result.getResult(), "IpResult.getResult 为 null");
            return result.getResult().getAd_info().toString();
        } catch (RuntimeException e) {
            return "未知";
        }
    }

    private String getBrowserInfo(String userAgent) {
        if (null == userAgent || userAgent.equals("")) {
            return "未知";
        }
        UserAgent agent = UserAgent.parseUserAgentString(userAgent);
        return agent.getBrowser() + "," + agent.getBrowserVersion();
    }
}
