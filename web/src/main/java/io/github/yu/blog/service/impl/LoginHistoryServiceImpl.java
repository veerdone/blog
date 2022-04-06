package io.github.yu.blog.service.impl;

import eu.bitwalker.useragentutils.UserAgent;
import io.github.yu.base.service.impl.BaseServiceImpl;
import io.github.yu.blog.mapper.LoginHistoryMapper;
import io.github.yu.blog.model.IpResult;
import io.github.yu.blog.model.LoginHistory;
import io.github.yu.blog.model.User;
import io.github.yu.blog.service.LoginHistoryService;
import io.github.yu.common.util.IdUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;

@Service
public class LoginHistoryServiceImpl extends BaseServiceImpl<LoginHistory, LoginHistory, LoginHistoryMapper>
        implements LoginHistoryService {
    @Value("${ip.key}")
    private String key;

    @Autowired
    private RestTemplate restTemplate;

    @Override
    @Transactional(rollbackFor = {RuntimeException.class, Error.class})
    public void insert(LoginHistory loginHistory) {
        RequestAttributes requestAttributes = RequestContextHolder.currentRequestAttributes();
        HttpServletRequest request = ((ServletRequestAttributes) requestAttributes).getRequest();

        loginHistory.setId(IdUtil.getId());
        loginHistory.setLoginTime(LocalDateTime.now());
        String ip = getIp(request);
        if (ip.equals("127.0.0.1")) {
            loginHistory.setLoginSite("localhost");
        } else {
            loginHistory.setLoginSite(getCity(ip));
        }
        loginHistory.setLoginIp(ip);
        loginHistory.setBrowserName(getBrowserInfo(request.getHeader("User-Agent")));
        super.mapper.insert(loginHistory);
    }

    private String getIp(HttpServletRequest request) {
        if (request == null) {
            return "unknown";
        }
        String ip = request.getHeader("x-forwarded-for");
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("X-Forwarded-For");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("WL-Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("X-Real-IP");
        }

        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }
        return "0:0:0:0:0:0:0:1".equals(ip) ? "127.0.0.1" : ip;
    }

    private String getCity(String ip) {
        String url = "https://apis.map.qq.com/ws/location/v1/ip?ip={1}&key={2}";
        IpResult result = restTemplate.getForObject(url, IpResult.class, ip, key);
        return result.getResult().getAd_info().toString();
    }

    private String getBrowserInfo(String userAgent) {
        if (null == userAgent || userAgent.equals("")) {
            return "未知";
        }
        UserAgent agent = UserAgent.parseUserAgentString(userAgent);
        return agent.getBrowser() + "," + agent.getBrowserVersion();
    }
}
